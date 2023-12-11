import { TextM, TextXXXL } from '@portkey/rn-sdk/src/components/CommonText';
import PageContainer from '@portkey/rn-sdk/src/components/PageContainer';
import { useLanguage } from '@portkey/rn-sdk/src/i18n/hooks';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { GUARDIAN_EXPIRED_TIME, VERIFIER_EXPIRATION } from '@portkey/rn-sdk/src/packages/constants/misc';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import CommonButton from '@portkey/rn-sdk/src/components/CommonButton';
import { BorderStyles, FontStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import Svg from '@portkey/rn-sdk/src/components/Svg';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import { getApprovalCount } from '@portkey/rn-sdk/src/packages/utils/guardian';
import { ApprovalType, OperationTypeEnum, VerifyStatus } from '@portkey/rn-sdk/src/packages/types/verifier';
import GuardianItem from '@portkey/rn-sdk/src/pages/Guardian/components/GuardianItem';
import useEffectOnce from '@portkey/rn-sdk/src/hooks/useEffectOnce';
import Touchable from '@portkey/rn-sdk/src/components/Touchable';
import ActionSheet from '@portkey/rn-sdk/src/components/ActionSheet';
import { GuardiansStatus, GuardiansStatusItem } from '@portkey/rn-sdk/src/pages/Guardian/types';
import { GuardianVerifyConfig, GuardianVerifyType } from '@portkey/rn-sdk/src/model/verify/social-recovery';
import { GuardianConfig } from '@portkey/rn-sdk/src/model/verify/guardian';
import { UserGuardianItem } from 'packages/types/store-ca/guardians/type';
import { GuardianApprovalPageResult } from '@portkey/rn-sdk/src/pages/Entries/GuardianApproval';
import Loading from '@portkey/rn-sdk/src/components/Loading';
import { verifyHumanMachine } from '@portkey/rn-sdk/src/components/VerifyHumanMachine';
import { guardianTypeStrToEnum, isReacptchaOpen } from '@portkey/rn-sdk/src/model/global';
import { NetworkController } from '@portkey/rn-sdk/src/network/controller';
import { VerifierDetailsPageProps } from '@portkey/rn-sdk/src/pages/Entries/VerifierDetails';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import { AccountOriginalType, AfterVerifiedConfig, VerifiedGuardianDoc } from '@portkey/rn-sdk/src/model/verify/core';
import { VerifyPageResult } from '@portkey/rn-sdk/src/pages/Guardian/VerifierDetails';
import useBaseContainer from '@portkey/rn-sdk/src/model/container/UseBaseContainer';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import CommonToast from '@portkey/rn-sdk/src/components/CommonToast';
import { PortkeyConfig } from '@portkey/rn-sdk/src/global/constants';
import { ApprovedGuardianInfo } from '@portkey/rn-sdk/src/network/dto/wallet';
import { AppleAccountInfo, GoogleAccountInfo, isAppleLogin } from '@portkey/rn-sdk/src/model/verify/third-party-account';
import { useAppleAuthentication, useGoogleAuthentication } from '@portkey/rn-sdk/src/model/hooks/authentication';
import { getBottomSpace } from '@portkey/rn-sdk/src/utils/screen';
import {
  callAddGuardianMethod,
  callEditGuardianMethod,
  callEditPaymentSecurityMethod,
  callRemoveGuardianMethod,
} from '@portkey/rn-sdk/src/model/contract/handler';

export default function GuardianApproval({
  guardianVerifyConfig: guardianListConfig,
  verifiedTime,
  onPageFinish,
}: {
  guardianVerifyConfig: GuardianVerifyConfig;
  verifiedTime: number;
  onPageFinish: (result: GuardianApprovalPageResult) => void;
}) {
  const {
    guardians,
    accountIdentifier = '',
    accountOriginalType,
    thirdPartyAccountInfo,
    guardianVerifyType,
    particularGuardian,
    pastGuardian,
    paymentSecurityConfig,
  } = guardianListConfig;

  const { t } = useLanguage();

  let operationType = OperationTypeEnum.communityRecovery;
  switch (guardianVerifyType) {
    case GuardianVerifyType.ADD_GUARDIAN: {
      operationType = OperationTypeEnum.addGuardian;
      break;
    }
    case GuardianVerifyType.REMOVE_GUARDIAN: {
      operationType = OperationTypeEnum.deleteGuardian;
      break;
    }
    case GuardianVerifyType.CHANGE_LOGIN_GUARDIAN: {
      operationType = OperationTypeEnum.setLoginAccount;
      break;
    }
    case GuardianVerifyType.MODIFY_GUARDIAN: {
      operationType = OperationTypeEnum.editGuardian;
      break;
    }
    case GuardianVerifyType.EDIT_PAYMENT_SECURITY: {
      operationType = OperationTypeEnum.modifyTransferLimit;
      break;
    }
    case GuardianVerifyType.CREATE_WALLET:
    default: {
      operationType = OperationTypeEnum.communityRecovery;
    }
  }

  const { navigateForResult, onFinish: onBackPage } = useBaseContainer({
    entryName: PortkeyEntries.GUARDIAN_APPROVAL_ENTRY,
  });

  const { appleSign } = useAppleAuthentication();
  const { googleSign } = useGoogleAuthentication();

  const appleLoginAdapter = useCallback(async (): Promise<AppleAccountInfo> => {
    const userInfo = await appleSign();
    return {
      accountIdentifier: userInfo?.user?.id,
      identityToken: userInfo?.identityToken,
    };
  }, [appleSign]);

  const googleLoginAdapter = useCallback(async (): Promise<GoogleAccountInfo> => {
    const userInfo = await googleSign();
    return {
      accountIdentifier: userInfo?.user?.id,
      accessToken: userInfo?.accessToken,
    };
  }, [googleSign]);

  const [guardiansStatus, setApproved] = useState<GuardiansStatus>();
  const [isExpired, setIsExpired] = useState<boolean>();

  const guardianExpiredTime = useRef<number>();
  const approvedList = useMemo(() => {
    return Object.values(guardiansStatus || {}).filter(guardian => guardian.status === VerifyStatus.Verified);
  }, [guardiansStatus]);

  const [sentGuardianKeys, setSentGuardianKeys] = useState<Map<string, string>>(new Map());

  const setGuardianStatus = useCallback((key: string, status: GuardiansStatusItem) => {
    if (key === 'resetGuardianApproval') {
      setApproved(undefined);
      guardianExpiredTime.current = undefined;
    } else {
      if (!guardianExpiredTime.current && status?.status === VerifyStatus.Verified) {
        guardianExpiredTime.current = Date.now() + GUARDIAN_EXPIRED_TIME;
      }
      setApproved(preGuardiansStatus => ({ ...preGuardiansStatus, [key]: status }));
    }
  }, []);

  const guardianCount = useMemo(() => getApprovalCount(guardians?.length || 0), [guardians?.length]);
  const isSuccess = useMemo(() => guardianCount <= approvedList.length, [guardianCount, approvedList.length]);
  const onSetGuardianStatus = useCallback(
    (data: { key: string; status: GuardiansStatusItem }) => {
      setGuardianStatus(data.key, data.status);
      if (!guardianExpiredTime.current && data.status?.status === VerifyStatus.Verified)
        guardianExpiredTime.current = Date.now() + GUARDIAN_EXPIRED_TIME;
    },
    [setGuardianStatus],
  );
  useEffectOnce(() => {
    const expiredTimer = setInterval(() => {
      if (guardianExpiredTime.current && Date.now() > guardianExpiredTime.current) setIsExpired(true);
    }, 1000);
    if (verifiedTime) guardianExpiredTime.current = verifiedTime + GUARDIAN_EXPIRED_TIME;
    return () => {
      expiredTimer && clearInterval(expiredTimer);
    };
  });

  const onBack = () => {
    onBackPage({
      status: 'cancel',
      data: {
        isVerified: false,
      },
    });
  };

  const getVerifiedData = async (): Promise<AfterVerifiedConfig> => {
    return {
      normalVerifyPathInfo: {
        fromRecovery: true,
        accountIdentifier,
        chainId: await PortkeyConfig.currChainId(),
        verifiedGuardians: getVerifiedGuardianInfo(),
      },
    };
  };

  const getVerifiedGuardianInfo = (): Array<ApprovedGuardianInfo> => {
    return Object.entries(guardiansStatus || {})
      .map(([key, value]) => {
        const guardianInfo = guardians[Number(key)];
        if (value.status === VerifyStatus.Verified && guardianInfo) {
          return {
            type: guardianTypeStrToEnum(guardianInfo.sendVerifyCodeParams.type),
            identifier: guardianInfo.sendVerifyCodeParams.guardianIdentifier,
            verifierId: guardianInfo.sendVerifyCodeParams.verifierId,
            verificationDoc: value.verifierInfo?.verificationDoc,
            signature: value.verifierInfo?.signature,
          } as ApprovedGuardianInfo;
        } else {
          return null;
        }
      })
      .filter(item => item !== null) as any;
  };

  const onFinish = async () => {
    const pageData = await getVerifiedData();
    switch (guardianVerifyType) {
      case GuardianVerifyType.ADD_GUARDIAN: {
        if (!particularGuardian) throw new Error('guardian info is null!');
        Loading.show();
        const result = await callAddGuardianMethod(particularGuardian, getVerifiedGuardianInfo());
        Loading.hide();
        onPageFinish({
          isVerified: !result?.error,
        });
        break;
      }

      case GuardianVerifyType.REMOVE_GUARDIAN: {
        if (!particularGuardian) throw new Error('guardian info is null!');
        Loading.show();
        const result = await callRemoveGuardianMethod(particularGuardian, getVerifiedGuardianInfo());
        Loading.hide();
        onPageFinish({
          isVerified: !result?.error,
        });
        break;
      }

      case GuardianVerifyType.MODIFY_GUARDIAN: {
        if (!particularGuardian || !pastGuardian) throw new Error('guardian info is null!');
        Loading.show();
        const result = await callEditGuardianMethod(particularGuardian, pastGuardian, getVerifiedGuardianInfo());
        Loading.hide();
        console.log('MODIFY_GUARDIAN result', result);
        onPageFinish({
          isVerified: !result.error,
        });
        break;
      }

      case GuardianVerifyType.EDIT_PAYMENT_SECURITY: {
        Loading.show();
        if (!paymentSecurityConfig) throw new Error('paymentSecurityConfig is null!');
        const result = await callEditPaymentSecurityMethod(getVerifiedGuardianInfo(), paymentSecurityConfig);
        Loading.hide();
        console.log('EDIT_PAYMENT_SECURITY result', result);
        onPageFinish({
          isVerified: !result.error,
        });
        break;
      }

      case GuardianVerifyType.CREATE_WALLET:
      default: {
        onPageFinish({
          isVerified: true,
          deliveredVerifiedData: JSON.stringify(pageData),
        });
      }
    }
  };

  const particularButton = (guardian: GuardianConfig, key: string) => {
    const isVerified = guardiansStatus?.[key]?.status === VerifyStatus.Verified;
    const getTitle = () => {
      if (
        sentGuardianKeys.has(key) ||
        guardian.sendVerifyCodeParams.type === 'Apple' ||
        guardian.sendVerifyCodeParams.type === 'Google'
      ) {
        return 'Verify';
      } else {
        return 'Send';
      }
    };

    if (isVerified) {
      return <Text style={styles.confirmedButtonText}>Confirmed</Text>;
    } else if (isExpired) {
      return <Text style={styles.expiredButtonText}>Expired</Text>;
    } else {
      return (
        <CommonButton
          onPress={() => {
            handleGuardianOperation(guardian, key);
          }}
          disabled={false}
          containerStyle={styles.activityButton}
          titleStyle={styles.activityButtonText}
          type={isVerified ? 'clear' : 'primary'}
          title={getTitle()}
        />
      );
    }
  };

  const isPhoneOrEmailGuardian = (guardian: GuardianConfig) => {
    return guardian.sendVerifyCodeParams.type === 'Phone' || guardian.sendVerifyCodeParams.type === 'Email';
  };

  const handleGuardianOperation = async (guardian: GuardianConfig, key: string) => {
    if (isPhoneOrEmailGuardian(guardian)) {
      dealWithParticularGuardian(guardian, key);
    } else {
      dealWithThirdPartyGuardian(guardian, key);
    }
  };

  const dealWithThirdPartyGuardian = async (guardian: GuardianConfig, key: string) => {
    try {
      Loading.show();
      const thirdPartyAccount: GoogleAccountInfo | AppleAccountInfo = await handleCachedThirdPartyAccountData(guardian);
      Loading.hide();
      if (thirdPartyAccount) {
        Loading.show();
        const verifyResult = isAppleLogin(thirdPartyAccount)
          ? await NetworkController.verifyAppleGuardianInfo({
              id: thirdPartyAccount.accountIdentifier,
              verifierId: guardian.sendVerifyCodeParams.verifierId,
              accessToken: thirdPartyAccount.identityToken,
              chainId: await PortkeyConfig.currChainId(),
              operationType,
            })
          : await NetworkController.verifyGoogleGuardianInfo({
              verifierId: guardian.sendVerifyCodeParams.verifierId,
              accessToken: thirdPartyAccount.accessToken,
              chainId: await PortkeyConfig.currChainId(),
              operationType,
            });
        Loading.hide();
        if (verifyResult) {
          CommonToast.success('Verified Successfully');
          setGuardianStatus(key, {
            status: VerifyStatus.Verified,
            verifierInfo: {
              verificationDoc: verifyResult.verificationDoc,
              signature: verifyResult.signature,
              verifierId: guardian.sendVerifyCodeParams.verifierId,
            },
          });
          return;
        } else {
          CommonToast.fail('guardian verify failed, please try again.');
          Loading.hide();
        }
      }
    } catch (e) {
      console.error(e);
      CommonToast.fail('network fail.');
      Loading.hide();
    }
  };

  const handleCachedThirdPartyAccountData = async (
    guardian: GuardianConfig,
  ): Promise<GoogleAccountInfo | AppleAccountInfo> => {
    console.log('thirdPartyAccountInfo', thirdPartyAccountInfo);
    console.log('guardian', guardian);
    const { google, apple } = thirdPartyAccountInfo || {};
    if (guardian.sendVerifyCodeParams.type === 'Apple') {
      return apple && guardian.sendVerifyCodeParams.guardianIdentifier === apple?.accountIdentifier
        ? apple
        : await appleLoginAdapter();
    } else {
      return google && guardian.sendVerifyCodeParams.guardianIdentifier === google?.accountIdentifier
        ? google
        : await googleLoginAdapter();
    }
  };

  const dealWithParticularGuardian = async (guardian: GuardianConfig, key: string) => {
    if (sentGuardianKeys.has(key)) {
      const verifierSessionId = sentGuardianKeys.get(key);
      const guardianResult = await handleGuardianVerifyPage(
        Object.assign({}, guardian, {
          verifierSessionId,
        } as Partial<GuardianConfig>),
        true,
      );
      if (guardianResult) {
        CommonToast.success('Verified Successfully');
        setGuardianStatus(key, { status: VerifyStatus.Verified, verifierInfo: guardianResult });
        return;
      } else {
        CommonToast.fail('guardian verify failed, please try again.');
        Loading.hide();
      }
    } else {
      ActionSheet.alert({
        title: '',
        message: `${guardian.name ?? 'Portkey'} will send a verification code to ${
          guardian.sendVerifyCodeParams.guardianIdentifier
        } to verify your ${accountOriginalType === AccountOriginalType.Email ? 'email' : 'phone number'}.`,
        buttons: [
          { title: 'Cancel', type: 'outline' },
          {
            title: 'Confirm',
            onPress: async () => {
              try {
                Loading.show();
                const needRecaptcha = await isReacptchaOpen(operationType);
                let token: string | undefined;
                if (needRecaptcha) {
                  token = (await verifyHumanMachine('en')) as string;
                }
                const sendResult = await NetworkController.sendVerifyCode(
                  {
                    ...guardian.sendVerifyCodeParams,
                    operationType,
                  },
                  {
                    reCaptchaToken: token ?? '',
                  },
                );
                Loading.hide();
                if (sendResult) {
                  setSentGuardianKeys(preGuardianKeys => {
                    preGuardianKeys.set(key, sendResult.verifierSessionId);
                    return new Map(preGuardianKeys);
                  });
                  const guardianResult = await handleGuardianVerifyPage(
                    Object.assign({}, guardian, {
                      verifySessionId: sendResult.verifierSessionId,
                    } as Partial<GuardianConfig>),
                    true,
                  );
                  if (guardianResult) {
                    CommonToast.success('Verified Successfully');
                    setGuardianStatus(key, { status: VerifyStatus.Verified, verifierInfo: guardianResult });
                    return;
                  }
                }
                CommonToast.fail('guardian verify failed, please try again.');
                Loading.hide();
              } catch (e) {
                console.error(e);
                CommonToast.fail('network fail.');
                Loading.hide();
              }
            },
          },
        ],
      });
    }
  };

  const handleGuardianVerifyPage = async (
    guardianConfig?: GuardianConfig,
    alreadySent?: boolean,
  ): Promise<VerifiedGuardianDoc | null> => {
    const guardian = guardianConfig;
    if (!guardian) {
      console.error('guardianConfig is not defined.');
      return null;
    }
    return new Promise(resolve => {
      navigateToGuardianPage(
        Object.assign({}, guardian, { alreadySent: alreadySent ?? false, operationType }),
        result => {
          resolve(result);
        },
      );
    });
  };

  const navigateToGuardianPage = (config: GuardianConfig, callback: (result: VerifiedGuardianDoc) => void) => {
    navigateForResult<VerifyPageResult, VerifierDetailsPageProps>(
      PortkeyEntries.VERIFIER_DETAIL_ENTRY,
      {
        params: {
          deliveredGuardianInfo: JSON.stringify(config),
          operationType,
        },
      },
      res => {
        Loading.hide();
        const { data } = res;
        callback(data?.verifiedData ? JSON.parse(data.verifiedData) : null);
      },
    );
  };

  return (
    <PageContainer
      scrollViewProps={{ disabled: true }}
      containerStyles={styles.containerStyle}
      leftIconType="close"
      leftCallback={onBack}
      backTitle={'Wallet Login'}
      type="leftBack"
      titleDom
      hideTouchable>
      <View style={GStyles.flex1}>
        <TextXXXL style={GStyles.alignCenter}>{t(`Guardians' approval`)}</TextXXXL>
        <TextM style={[styles.expireText, GStyles.alignCenter, FontStyles.font3]}>
          {isExpired ? 'Expired' : `Expire after ${VERIFIER_EXPIRATION} hour`}
        </TextM>
        <View style={[styles.verifierBody, GStyles.flex1]}>
          <View style={[GStyles.itemCenter, GStyles.flexRowWrap, BorderStyles.border6, styles.approvalTitleRow]}>
            <View style={[GStyles.itemCenter, GStyles.flexRowWrap, styles.approvalRow]}>
              <TextM style={[FontStyles.font3, styles.approvalTitle]}>{`Guardians' approval`}</TextM>
              <Touchable
                onPress={() =>
                  ActionSheet.alert({
                    title2: `You will need a certain number of guardians to confirm your action. The requirements differ depending on your guardian counts. If the total number is less than or equal to 3, approval from all is needed. If that figure is greater than 3, approval from a minimum of 60% is needed.`,
                    buttons: [{ title: 'OK' }],
                  })
                }>
                <Svg color={FontStyles.font3.color} size={pTd(16)} icon="question-mark" />
              </Touchable>
            </View>
            <TextM>
              <TextM style={FontStyles.font4}>{approvedList.length ?? 0}</TextM>/{guardianCount}
            </TextM>
          </View>
          <View style={GStyles.flex1}>
            <ScrollView>
              {guardians?.map((item, index) => {
                const parsedItem = {
                  ...item,
                  guardianAccount: item.sendVerifyCodeParams.guardianIdentifier,
                  isLoginAccount: item.isLoginGuardian,
                  guardianType: guardianTypeStrToEnum(item.sendVerifyCodeParams.type) as any,
                  key: `${index}`,
                  identifierHash: '',
                  verifier: {
                    id: item.sendVerifyCodeParams.verifierId,
                    name: item.name,
                    imageUrl: item.imageUrl,
                  },
                } as UserGuardianItem;
                return (
                  <GuardianItem
                    key={index}
                    guardianItem={parsedItem}
                    isButtonHide={true}
                    renderBtn={_ => {
                      return particularButton(item, `${index}`);
                    }}
                    setGuardianStatus={onSetGuardianStatus}
                    guardiansStatus={guardiansStatus}
                    isExpired={isExpired}
                    isSuccess={isSuccess}
                    approvalType={ApprovalType.communityRecovery}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
      {!isExpired && <CommonButton onPress={onFinish} disabled={!isSuccess} type="primary" title={'Confirm'} />}
    </PageContainer>
  );
}

const { primaryColor } = defaultColors;

const styles = StyleSheet.create({
  containerStyle: {
    paddingTop: 8,
    paddingBottom: 16 + getBottomSpace(),
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  activityButton: {
    height: 24,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primaryColor,
  },
  confirmButton: {
    height: 24,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  activityButtonText: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
  },
  confirmedButtonText: {
    color: '#20CD85',
    fontSize: 12,
    lineHeight: 16,
    backgroundColor: '#fff',
  },
  expiredButtonText: {
    color: '#8F949C',
    fontSize: 12,
    lineHeight: 16,
    backgroundColor: '#fff',
  },
  expireText: {
    marginTop: 8,
  },
  verifierBody: {
    marginTop: 40,
  },
  approvalTitleRow: {
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  approvalRow: {
    paddingBottom: 12,
  },
  approvalTitle: {
    marginRight: pTd(7),
  },
});
