import { message } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useLoading } from 'store/Provider/hooks';
import { LoginInfo } from 'store/reducers/loginCache/type';
import { UserGuardianItem } from '@portkey-wallet/store/store-ca/guardians/type';
import { useTranslation } from 'react-i18next';
import { setUserGuardianSessionIdAction } from '@portkey-wallet/store/store-ca/guardians/actions';
import { verifyErrorHandler } from 'utils/tryErrorHandler';
import { LoginType } from '@portkey-wallet/types/types-ca/wallet';
import { verification } from 'utils/api';
import { useOriginChainId } from '@portkey-wallet/hooks/hooks-ca/wallet';
import { useCommonState } from 'store/Provider/hooks';
import { useLocation } from 'react-router';
import { OperationTypeEnum, VerifierItem } from '@portkey-wallet/types/verifier';
import { CodeVerifyUI } from '@portkey/did-ui-react';
import { AccountType } from '@portkey/services';

const MAX_TIMER = 60;

enum VerificationError {
  InvalidCode = 'Invalid code',
  codeExpired = 'The code has expired. Please resend it.',
}

interface VerifierPageProps {
  operationType: OperationTypeEnum;
  loginAccount?: LoginInfo;
  currentGuardian?: UserGuardianItem;
  guardianType?: LoginType;
  isInitStatus?: boolean;
  onSuccess?: (res: { verificationDoc: string; signature: string; verifierId: string }) => void;
}

interface ICodeVerifyUIInterface {
  setTimer: (timer: number) => void;
}

export default function VerifierPage({
  operationType,
  currentGuardian,
  guardianType,
  isInitStatus,
  onSuccess,
}: VerifierPageProps) {
  const { setLoading } = useLoading();
  const { isNotLessThan768 } = useCommonState();
  const { pathname } = useLocation();
  const [isFromLoginOrRegister, setIsFromLoginOrRegister] = useState(true);
  const [pinVal, setPinVal] = useState<string>();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const originChainId = useOriginChainId();
  const uiRef = useRef<ICodeVerifyUIInterface>();

  useEffect(() => {
    setIsFromLoginOrRegister(pathname.includes('register') || pathname.includes('login'));
    console.log('isFromLoginOrRegister', isFromLoginOrRegister);
  }, [isFromLoginOrRegister, pathname]);

  const onFinish = useCallback(
    async (code: string) => {
      try {
        console.log(code);
        if (code && code.length === 6) {
          if (!guardianType && guardianType !== 0) return message.error('Missing guardiansType');
          if (!currentGuardian?.verifierInfo) throw 'Missing verifierInfo!!!';
          setLoading(true);

          const res = await verification.checkVerificationCode({
            params: {
              type: LoginType[currentGuardian?.guardianType as LoginType],
              guardianIdentifier: currentGuardian.guardianAccount.replaceAll(' ', ''),
              verifierSessionId: currentGuardian.verifierInfo.sessionId,
              verificationCode: code,
              verifierId: currentGuardian.verifier?.id || '',
              chainId: originChainId,
              operationType,
            },
          });

          setLoading(false);
          if (res.signature) return onSuccess?.({ ...res, verifierId: currentGuardian.verifier?.id || '' });

          if (res?.error?.message) {
            message.error(t(res.error.message));
          } else {
            message.error(t(VerificationError.InvalidCode));
          }
          setPinVal('');
        }
      } catch (error: any) {
        console.log(error, 'error====');
        setLoading(false);
        setPinVal('');
        const _error = verifyErrorHandler(error);
        message.error(_error);
      }
    },
    [guardianType, originChainId, currentGuardian, setLoading, onSuccess, t, operationType],
  );

  const resendCode = useCallback(async () => {
    try {
      if (!currentGuardian?.guardianAccount) throw 'Missing loginGuardianType';
      if (!guardianType && guardianType !== 0) throw 'Missing guardiansType';
      setLoading(true);

      const res = await verification.sendVerificationCode({
        params: {
          guardianIdentifier: currentGuardian.guardianAccount.replaceAll(' ', ''),
          type: LoginType[guardianType],
          verifierId: currentGuardian.verifier?.id || '',
          chainId: originChainId,
          operationType,
        },
      });
      setLoading(false);
      if (res.verifierSessionId) {
        uiRef.current?.setTimer(MAX_TIMER);
        dispatch(
          setUserGuardianSessionIdAction({
            key: currentGuardian?.key ?? `${currentGuardian?.guardianAccount}&${currentGuardian?.verifier?.name}`,
            verifierInfo: {
              sessionId: res.verifierSessionId,
              endPoint: res.endPoint,
            },
          }),
        );
      }
    } catch (error: any) {
      console.log(error, 'error===');
      setLoading(false);
      const _error = verifyErrorHandler(error);
      message.error(_error);
    }
  }, [currentGuardian, guardianType, originChainId, dispatch, setLoading, operationType]);

  return currentGuardian?.verifier ? (
    <CodeVerifyUI
      ref={uiRef}
      className={isNotLessThan768 ? '' : 'popup-page'}
      verifier={currentGuardian.verifier}
      guardianIdentifier={currentGuardian?.guardianAccount || ''}
      isCountdownNow={isInitStatus}
      isLoginGuardian={currentGuardian?.isLoginAccount}
      accountType={LoginType[currentGuardian?.guardianType as LoginType] as AccountType}
      code={pinVal}
      tipExtra={!isFromLoginOrRegister && 'Please contact your guardians, and enter '}
      onReSend={resendCode}
      onCodeFinish={onFinish}
      onCodeChange={setPinVal}
    />
  ) : (
    <div></div>
  );
}
