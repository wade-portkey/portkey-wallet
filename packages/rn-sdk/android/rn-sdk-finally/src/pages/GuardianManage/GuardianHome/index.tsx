import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import Svg from '@portkey/rn-sdk/src/components/Svg';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import PageContainer from '@portkey/rn-sdk/src/components/PageContainer';
import { useLanguage } from '@portkey/rn-sdk/src/i18n/hooks';
import GuardianItem from '@portkey/rn-sdk/src/pages/Guardian/components/GuardianItem';
import Touchable from '@portkey/rn-sdk/src/components/Touchable';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import { AccountOriginalType, getTempWalletConfig, RecoverWalletConfig } from '@portkey/rn-sdk/src/model/verify/core';
import { NetworkController } from '@portkey/rn-sdk/src/network/controller';
import { UserGuardianItem } from 'packages/types/store-ca/guardians/type';
import { getBottomSpace } from '@portkey/rn-sdk/src/utils/screen';
import { GuardianInfo } from '@portkey/rn-sdk/src/network/dto/guardian';
import { guardianTypeStrToEnum, parseGuardianInfo } from '@portkey/rn-sdk/src/model/global';
import useBaseContainer from '@portkey/rn-sdk/src/model/container/UseBaseContainer';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import { GuardianVerifyType } from '@portkey/rn-sdk/src/model/verify/social-recovery';
import useEffectOnce from '@portkey/rn-sdk/src/hooks/useEffectOnce';
import CommonToast from '@portkey/rn-sdk/src/components/CommonToast';
import Loading from '@portkey/rn-sdk/src/components/Loading';
import { ModifyGuardianProps } from '@portkey/rn-sdk/src/pages/Guardian/GuardianManage/ModifyGuardian';
import { PortkeyConfig } from '@portkey/rn-sdk/src/global/constants';
import { OperationTypeEnum } from '@portkey/rn-sdk/src/packages/types/verifier';
import { Verifier, getOrReadCachedVerifierData } from '@portkey/rn-sdk/src/model/contract/handler';

export default function GuardianHome({ containerId }: { containerId: any }) {
  const { t } = useLanguage();

  const [verifierMap, setVerifierMap] = useState<{
    [key: string]: any;
  }>([] as any);
  const verifierList: Array<Verifier> = useMemo(() => (verifierMap ? Object.values(verifierMap) : []), [verifierMap]);

  useEffectOnce(async () => {
    Loading.show();
    const { data } = await getOrReadCachedVerifierData();
    const { verifierServers: verifiers } = data || {};
    console.log('verifiers', JSON.stringify(verifiers));
    verifiers && setVerifierMap(verifiers);
    await refreshGuardianInfo();
    Loading.hide();
  });

  const { navigateTo: navigationTo, navigateForResult } = useBaseContainer({
    entryName: PortkeyEntries.GUARDIAN_HOME_ENTRY,
    onNewIntent: async (intent: GuardiansApprovalIntent) => {
      console.log('GuardianHome onNewIntent', intent);
      switch (intent.type) {
        case GuardianVerifyType.ADD_GUARDIAN: {
          if (intent.result === 'success') {
            CommonToast.success('Add guardian success', 1000);
          } else {
            CommonToast.fail('Add guardian fail');
          }
          break;
        }
        case GuardianVerifyType.MODIFY_GUARDIAN: {
          if (intent.result === 'success') {
            CommonToast.success('Edit guardian success', 1000);
          } else {
            CommonToast.fail('Edit guardian fail');
          }
          break;
        }
        case GuardianVerifyType.REMOVE_GUARDIAN: {
          if (intent.result === 'success') {
            CommonToast.success('Remove guardian success', 1000);
          } else {
            CommonToast.fail('Remove guardian fail');
          }
          break;
        }
      }
    },
    onShow: async () => {
      Loading.show();
      await refreshGuardianInfo();
      Loading.hide();
    },
    containerId,
  });

  const [guardianList, setGuardianList] = useState<GuardianInfo[]>([]);
  const userGuardiansList = useMemo(() => {
    if (!guardianList) return [];
    return guardianList
      .map((item, index) => {
        const verifier = verifierList.find(v => v.id === item.verifierId);
        const parsedItem = {
          ...item,
          identifierHash: item.identifierHash,
          guardianAccount: item.guardianIdentifier,
          isLoginAccount: item.isLoginGuardian,
          guardianType: guardianTypeStrToEnum(item.type as 'Apple' | 'Google' | 'Email' | 'Phone'),
          key: `${index}`,
          verifier,
        } as UserGuardianItem;
        return parsedItem;
      })
      .reverse();
  }, [guardianList, verifierList]);

  const refreshGuardianInfo = useCallback(async () => {
    const config: RecoverWalletConfig = await getTempWalletConfig();
    const guardianInfo = await NetworkController.getGuardianInfo(
      config.accountIdentifier as string,
      config?.caInfo?.caHash,
    );
    if (guardianInfo?.guardianList?.guardians) {
      setGuardianList(guardianInfo?.guardianList?.guardians);
    }
  }, []);

  const renderGuardianBtn = useCallback(
    () => <Svg icon="right-arrow" color={defaultColors.icon1} size={pTd(16)} />,
    [],
  );

  return (
    <PageContainer
      safeAreaColor={['blue', 'white']}
      titleDom={t('Guardians')}
      containerStyles={pageStyles.pageWrap}
      scrollViewProps={{ disabled: false }}
      rightDom={
        <TouchableOpacity
          style={{ padding: pTd(16) }}
          onPress={() => {
            navigationTo(PortkeyEntries.ADD_GUARDIAN_ENTRY, {});
          }}>
          <Svg icon="add1" size={pTd(20)} color={defaultColors.font2} />
        </TouchableOpacity>
      }>
      <View>
        {userGuardiansList.map((guardian, idx) => (
          <Touchable
            key={idx}
            onPress={async () => {
              const chainId = await PortkeyConfig.currChainId();
              const cachedVerifierData = Object.values(
                (await getOrReadCachedVerifierData()).data?.verifierServers ?? {},
              );
              navigateForResult(PortkeyEntries.GUARDIAN_DETAIL_ENTRY, {
                closeCurrentScreen: false,
                params: {
                  info: JSON.stringify({
                    particularGuardianInfo: parseGuardianInfo(
                      guardianList[Number(guardian.key)],
                      chainId,
                      cachedVerifierData,
                      undefined,
                      '',
                      AccountOriginalType.Email,
                      OperationTypeEnum.editGuardian,
                    ),
                    originalGuardianItem: guardian,
                  } as ModifyGuardianProps),
                },
              });
            }}>
            <GuardianItem
              guardianItem={guardian}
              isButtonHide
              renderBtn={renderGuardianBtn}
              isBorderHide={idx === guardianList.length - 1}
            />
          </Touchable>
        ))}
      </View>
    </PageContainer>
  );
}

export interface GuardiansApprovalIntent {
  type: GuardianVerifyType;
  result: 'success' | 'fail' | 'cancel' | 'system';
  extra?: any;
}

const pageStyles = StyleSheet.create({
  pageWrap: {
    flex: 1,
    backgroundColor: defaultColors.bg1,
    paddingBottom: getBottomSpace(),
    ...GStyles.paddingArg(16, 20),
  },
});
