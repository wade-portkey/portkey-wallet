import { DIGIT_CODE } from '@portkey/rn-sdk/src/packages/constants/misc';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import { TextM } from '@portkey/rn-sdk/src/components/CommonText';
import VerifierCountdown, { VerifierCountdownInterface } from '@portkey/rn-sdk/src/components/VerifierCountdown';
import PageContainer from '@portkey/rn-sdk/src/components/PageContainer';
import DigitInput, { DigitInputInterface } from '@portkey/rn-sdk/src/components/DigitInput';
import React, { useMemo, useRef } from 'react';
import { StyleSheet, Text } from 'react-native';
import { OperationTypeEnum, VerificationType } from '@portkey/rn-sdk/src/packages/types/verifier';
import { FontStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import { LoginType } from '@portkey/rn-sdk/src/packages/types/types-ca/wallet';
import { AccountOriginalType } from '@portkey/rn-sdk/src/model/verify/core';
import usePhoneOrEmailGuardian, { GuardianConfig, INIT_TIME_OUT } from '@portkey/rn-sdk/src/model/verify/guardian';
import { NetworkController } from '@portkey/rn-sdk/src/network/controller';
import { verifyHumanMachine } from '@portkey/rn-sdk/src/components/VerifyHumanMachine';
import Loading from '@portkey/rn-sdk/src/components/Loading';
import useBaseContainer from '@portkey/rn-sdk/src/model/container/UseBaseContainer';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import { CheckVerifyCodeResultDTO } from '@portkey/rn-sdk/src/network/dto/guardian';
import GuardianItem from '@portkey/rn-sdk/src/pages/Guardian/components/GuardianItem';
import { UserGuardianItem } from 'packages/types/store-ca/guardians/type';
import CommonToast from '@portkey/rn-sdk/src/components/CommonToast';
import useEffectOnce from '@portkey/rn-sdk/src/hooks/useEffectOnce';

function TipText({ guardianAccount, isRegister }: { guardianAccount?: string; isRegister?: boolean }) {
  const [first, last] = useMemo(() => {
    if (!isRegister)
      return [
        `Please contact your guardians, and enter the ${DIGIT_CODE.length}-digit code sent to `,
        ` within ${DIGIT_CODE.expiration} minutes.`,
      ];
    return [`A ${DIGIT_CODE.length}-digit code was sent to `, ` Enter it within ${DIGIT_CODE.expiration} minutes`];
  }, [isRegister]);
  return (
    <TextM style={[FontStyles.font3, GStyles.marginTop(16), GStyles.marginBottom(50)]}>
      {first}
      <Text style={FontStyles.font4}>{guardianAccount}</Text>
      {last}
    </TextM>
  );
}

export default function VerifierDetails({
  guardianConfig,
  operationType,
}: {
  operationType: OperationTypeEnum;
  accountIdentifier: string;
  accountOriginalType: AccountOriginalType;
  guardianConfig: GuardianConfig;
}) {
  const { onFinish } = useBaseContainer({
    entryName: PortkeyEntries.VERIFIER_DETAIL_ENTRY,
  });

  const realOperationType =
    operationType !== OperationTypeEnum.unknown ? operationType : guardianConfig.sendVerifyCodeParams.operationType;
  const guardianItem: UserGuardianItem = {
    guardianAccount: guardianConfig.sendVerifyCodeParams.guardianIdentifier,
    guardianType: guardianConfig.sendVerifyCodeParams.type === 'Phone' ? LoginType.Phone : LoginType.Email,
    verifier: {
      id: guardianConfig.sendVerifyCodeParams.verifierId,
      name: guardianConfig.name ?? 'Portkey',
      imageUrl: guardianConfig.imageUrl ?? '',
    },
    isLoginAccount: guardianConfig.isLoginGuardian,
    key: '0',
    identifierHash: '',
    salt: guardianConfig.salt ?? '',
  };

  const guardianInfo = useMemo(() => {
    const parsedGuardian = JSON.parse(JSON.stringify(guardianConfig));
    parsedGuardian.sendVerifyCodeParams.operationType = realOperationType;
    return parsedGuardian;
  }, [guardianConfig, realOperationType]);

  const { countDown: countDownNumber, sendVerifyCode, checkVerifyCode } = usePhoneOrEmailGuardian(guardianInfo);

  const tryToResendCode = async () => {
    if (countDownNumber > 0) {
      console.error(`countDown: ${countDownNumber}`);
      return;
    }
    try {
      let token: string | undefined;
      Loading.show();
      const needRecaptcha = await NetworkController.isGoogleRecaptchaOpen(realOperationType);
      if (needRecaptcha) {
        token = (await verifyHumanMachine('en')) as string;
      }
      const sendSuccess = await sendVerifyCode(token);
      if (sendSuccess) {
        countdown.current?.resetTime(INIT_TIME_OUT);
        Loading.hide();
        return;
      }
    } catch (e) {
      Loading.hide();
    }
    CommonToast.fail('Network error, please try again.');
  };

  const onPageFinish = (result: CheckVerifyCodeResultDTO | null) => {
    onFinish<VerifyPageResult>({
      status: result ? 'success' : 'fail',
      data: { verifiedData: result ? JSON.stringify(result) : '' },
    });
  };

  const onInputFinish = async (code: string) => {
    try {
      Loading.show();
      const result = await checkVerifyCode(code);
      Loading.hide();
      if (result?.signature && result?.verificationDoc) {
        onPageFinish(result);
        return;
      } else if (result?.failedBecauseOfTooManyRequests) {
        digitInput.current?.reset();
        CommonToast.fail('Too many retries');
        return;
      }
    } catch (e) {
      Loading.hide();
    }
    digitInput.current?.reset();
    CommonToast.fail('Verification code is incorrect');
  };

  const onBack = () => {
    onPageFinish(null);
  };

  const countdown = useRef<VerifierCountdownInterface>();
  const digitInput = useRef<DigitInputInterface>();

  useEffectOnce(() => {
    if (guardianConfig.alreadySent) {
      countdown.current?.resetTime(INIT_TIME_OUT);
    }
  });

  return (
    <PageContainer
      type="leftBack"
      titleDom="VerifierDetails"
      safeAreaColor={['white']}
      leftCallback={onBack}
      containerStyles={styles.containerStyles}
      scrollViewProps={{ disabled: true }}>
      {guardianItem ? <GuardianItem guardianItem={guardianItem} isButtonHide /> : null}
      <TipText
        isRegister={realOperationType === OperationTypeEnum.register}
        guardianAccount={guardianItem?.guardianAccount}
      />
      <DigitInput ref={digitInput} onFinish={onInputFinish} maxLength={DIGIT_CODE.length} />
      <VerifierCountdown style={GStyles.marginTop(24)} onResend={tryToResendCode} ref={countdown} />
    </PageContainer>
  );
}

export interface VerifyPageResult {
  verifiedData: string;
}

const styles = StyleSheet.create({
  containerStyles: {
    paddingTop: 8,
    paddingHorizontal: 20,
  },
});
