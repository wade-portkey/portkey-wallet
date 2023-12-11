import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import CommonButton from '@portkey/rn-sdk/src/components/CommonButton';
import { TextM, TextS } from '@portkey/rn-sdk/src/components/CommonText';
import Svg from '@portkey/rn-sdk/src/components/Svg';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import PageContainer from '@portkey/rn-sdk/src/components/PageContainer';
import { pageStyles } from '@portkey/rn-sdk/src/pages/Guardian/GuardianManage/style';
import ListItem from '@portkey/rn-sdk/src/components/ListItem';
import { useLanguage } from '@portkey/rn-sdk/src/i18n/hooks';
import { LOGIN_TYPE_LIST } from '@portkey/rn-sdk/src/packages/constants/verifier';
import { OperationTypeEnum, VerifierItem } from '@portkey/rn-sdk/src/packages/types/verifier';
import { INIT_HAS_ERROR, INIT_NONE_ERROR } from '@portkey/rn-sdk/src/constants/common';
import VerifierSelectOverlay from '@portkey/rn-sdk/src/pages/Guardian/components/VerifierSelectOverlay';
import ActionSheet from '@portkey/rn-sdk/src/components/ActionSheet';
import { ErrorType } from '@portkey/rn-sdk/src/types/common';
import { FontStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import Loading from '@portkey/rn-sdk/src/components/Loading';
import CommonToast from '@portkey/rn-sdk/src/components/CommonToast';
import { LoginType } from '@portkey/rn-sdk/src/packages/types/types-ca/wallet';
import { VerifierImage } from '@portkey/rn-sdk/src/pages/Guardian/components/VerifierImage';
import GuardianAccountItem from '@portkey/rn-sdk/src/pages/Guardian/components/GuardianAccountItem';
import { GuardianConfig } from '@portkey/rn-sdk/src/model/verify/guardian';
import { PortkeyConfig } from '@portkey/rn-sdk/src/global/constants';
import useEffectOnce from '@portkey/rn-sdk/src/hooks/useEffectOnce';
import { Verifier, callCancelLoginGuardianMethod, getOrReadCachedVerifierData } from '@portkey/rn-sdk/src/model/contract/handler';
import { guardianTypeStrToEnum, parseGuardianInfo } from '@portkey/rn-sdk/src/model/global';
import { AccountOriginalType } from '@portkey/rn-sdk/src/model/verify/core';
import { getUnlockedWallet } from '@portkey/rn-sdk/src/model/wallet';
import { NetworkController } from '@portkey/rn-sdk/src/network/controller';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import useBaseContainer from '@portkey/rn-sdk/src/model/container/UseBaseContainer';
import { handleGuardiansApproval } from '@portkey/rn-sdk/src/model/verify/entry/hooks';
import { GuardianVerifyType } from '@portkey/rn-sdk/src/model/verify/social-recovery';
import { UserGuardianItem } from 'packages/types/store-ca/guardians/type';

type thirdPartyInfoType = {
  id: string;
  accessToken: string;
};

type TypeItemType = typeof LOGIN_TYPE_LIST[number];

const ModifyGuardian = (config: { info: string }) => {
  const { t } = useLanguage();
  const [editGuardian, setEditGuardian] = useState<GuardianConfig>();
  const [guardianItem, setOriginalGuardianItem] = useState<UserGuardianItem>();
  const [userGuardiansList, setUserGuardiansList] = useState<Array<GuardianConfig>>([]);
  const [verifierMap, setVerifierMap] = useState<{
    [key: string]: any;
  }>([] as any);
  const verifierList: Array<Verifier> = useMemo(() => (verifierMap ? Object.values(verifierMap) : []), [verifierMap]);

  const [selectedType, setSelectedType] = useState<TypeItemType>();
  const [selectedVerifier, setSelectedVerifier] = useState<VerifierItem>();
  const [account, setAccount] = useState<string>();
  const [guardianError, setGuardianError] = useState<ErrorType>({ ...INIT_NONE_ERROR });
  const { onFinish } = useBaseContainer({
    entryName: PortkeyEntries.MODIFY_GUARDIAN_ENTRY,
  });

  const thirdPartyInfoRef = useRef<thirdPartyInfoType>();

  useEffectOnce(async () => {
    Loading.show();
    try {
      const { particularGuardianInfo, originalGuardianItem } = JSON.parse(config.info) as ModifyGuardianProps;
      particularGuardianInfo && setEditGuardian(particularGuardianInfo);
      originalGuardianItem && setOriginalGuardianItem(originalGuardianItem);
      const { data } = await getOrReadCachedVerifierData();
      const { verifierServers: verifiers } = data || {};
      console.log('verifiers', JSON.stringify(verifiers));
      verifiers && setVerifierMap(verifiers);
      const {
        caInfo: { caHash },
      } = await getUnlockedWallet();
      const chainId = await PortkeyConfig.currChainId();
      const guardiansInfo = await NetworkController.getGuardianInfo('', caHash);
      const cachedVerifierData = Object.values((await getOrReadCachedVerifierData()).data?.verifierServers ?? {});
      const parsedGuardians = guardiansInfo?.guardianList?.guardians?.map(guardian => {
        return parseGuardianInfo(
          guardian,
          chainId,
          cachedVerifierData,
          undefined,
          undefined,
          AccountOriginalType.Email,
          OperationTypeEnum.editGuardian,
        );
      });
      console.log('guardians:', JSON.stringify(parsedGuardians));
      parsedGuardians && setUserGuardiansList(parsedGuardians);
    } catch (e) {
      console.log('error', e);
    }
    Loading.hide();
  });

  useEffect(() => {
    if (editGuardian) {
      const typeEnum = guardianTypeStrToEnum(editGuardian.sendVerifyCodeParams.type);
      setSelectedType(LOGIN_TYPE_LIST.find(item => item.value === typeEnum));
      if ([LoginType.Apple, LoginType.Google].includes(typeEnum)) {
        setAccount(editGuardian.thirdPartyEmail);
      } else {
        setAccount(editGuardian.sendVerifyCodeParams.guardianIdentifier);
      }
      !selectedVerifier &&
        setSelectedVerifier(verifierList.find(item => item.id === editGuardian.sendVerifyCodeParams.verifierId));
    }
  }, [editGuardian, selectedVerifier, verifierList]);

  const onChooseVerifier = useCallback((item: VerifierItem) => {
    setGuardianError({ ...INIT_NONE_ERROR });
    setSelectedVerifier(item);
  }, []);

  const checkCurGuardianRepeat = useCallback(() => {
    if (!selectedType) {
      return { ...INIT_HAS_ERROR };
    }
    if ([LoginType.Email, LoginType.Phone].includes(selectedType.value)) {
      if (
        userGuardiansList?.findIndex(
          guardian =>
            guardianTypeStrToEnum(guardian.sendVerifyCodeParams.type) === selectedType?.value &&
            guardian.sendVerifyCodeParams.guardianIdentifier === account &&
            guardian.sendVerifyCodeParams.verifierId === selectedVerifier?.id,
        ) !== -1
      ) {
        return { ...INIT_HAS_ERROR, errorMsg: t('This guardian already exists') };
      } else {
        return { ...INIT_NONE_ERROR };
      }
    }

    if ([LoginType.Apple, LoginType.Google].includes(selectedType.value)) {
      const guardianAccount = thirdPartyInfoRef.current?.id;
      if (
        userGuardiansList?.findIndex(
          guardian =>
            guardianTypeStrToEnum(guardian.sendVerifyCodeParams.type) === selectedType?.value &&
            guardian.sendVerifyCodeParams.guardianIdentifier === guardianAccount &&
            guardian.sendVerifyCodeParams.verifierId === selectedVerifier?.id,
        ) !== -1
      ) {
        return { ...INIT_HAS_ERROR, errorMsg: t('This guardian already exists') };
      } else {
        return { ...INIT_NONE_ERROR };
      }
    }
    return { ...INIT_NONE_ERROR };
  }, [account, selectedType, selectedVerifier?.id, t, userGuardiansList]);

  const onApproval = useCallback(() => {
    const _guardianError = checkCurGuardianRepeat();
    setGuardianError(_guardianError);
    if (_guardianError.isError || !editGuardian || !selectedVerifier) return;
    Loading.show();
    const thisGuardian = JSON.parse(JSON.stringify(editGuardian)) as GuardianConfig;
    thisGuardian.sendVerifyCodeParams = {
      ...thisGuardian.sendVerifyCodeParams,
      verifierId: selectedVerifier.id,
    };
    thisGuardian.name = selectedVerifier.name;
    thisGuardian.imageUrl = selectedVerifier.imageUrl;
    const guardianList = userGuardiansList.filter(
      it =>
        it.sendVerifyCodeParams.verifierId !== editGuardian.sendVerifyCodeParams.verifierId ||
        it.sendVerifyCodeParams.guardianIdentifier !== editGuardian.sendVerifyCodeParams.guardianIdentifier ||
        it.sendVerifyCodeParams.type !== editGuardian.sendVerifyCodeParams.type,
    );
    guardianList.push(thisGuardian);
    handleGuardiansApproval({
      particularGuardian: thisGuardian,
      pastGuardian: editGuardian,
      guardianVerifyType: GuardianVerifyType.MODIFY_GUARDIAN,
      accountIdentifier: editGuardian.accountIdentifier ?? '',
      accountOriginalType: editGuardian.accountOriginalType ?? AccountOriginalType.Email,
      guardians: guardianList,
      failHandler: () => {
        CommonToast.fail('Edit guardian fail');
      },
    });
  }, [checkCurGuardianRepeat, editGuardian, selectedVerifier, userGuardiansList]);

  const onRemove = useCallback(async () => {
    if (!editGuardian || !userGuardiansList) return;
    const isLastLoginAccount = checkIsTheLastLoginGuardian(userGuardiansList, editGuardian);
    if (isLastLoginAccount) {
      ActionSheet.alert({
        title2: t('This guardian is the only login account and cannot be removed'),
        buttons: [
          {
            title: t('OK'),
          },
        ],
      });
      return;
    }

    const isLoginAccount = editGuardian.isLoginGuardian;
    const result = await new Promise(resolve => {
      ActionSheet.alert({
        title: isLoginAccount ? undefined : 'Are you sure you want to remove this guardian?',
        title2: isLoginAccount
          ? `This guardian is set as a login account. Click "Confirm" to unset and remove this guardian`
          : undefined,
        message: isLoginAccount ? undefined : `Removing a guardian requires guardians' approval`,
        buttons: [
          {
            title: isLoginAccount ? 'Cancel' : 'Close',
            type: 'outline',
            onPress: () => {
              resolve(false);
            },
          },
          {
            title: isLoginAccount ? 'Confirm' : 'Send Request',
            onPress: () => {
              resolve(true);
            },
          },
        ],
      });
    });
    if (!result) return;

    if (editGuardian.isLoginGuardian) {
      Loading.show();
      try {
        const req = await callCancelLoginGuardianMethod(editGuardian);
        if (req && !req.error) {
          onFinish({
            status: 'success',
          });
        } else {
          CommonToast.fail(req?.error?.message || '');
        }
        return;
      } catch (error) {
        CommonToast.failError(error);
        return;
      } finally {
        Loading.hide();
      }
    }

    handleGuardiansApproval({
      guardianVerifyType: GuardianVerifyType.REMOVE_GUARDIAN,
      particularGuardian: editGuardian,
      accountIdentifier: editGuardian.accountIdentifier ?? '',
      accountOriginalType: editGuardian.accountOriginalType ?? AccountOriginalType.Email,
      guardians: userGuardiansList.map(it => {
        it.sendVerifyCodeParams.operationType = OperationTypeEnum.deleteGuardian;
        return it;
      }),
      failHandler: () => {
        CommonToast.fail('Remove guardian fail');
      },
    });
  }, [editGuardian, onFinish, t, userGuardiansList]);

  const isApprovalDisable = useMemo(
    () => selectedVerifier?.id === editGuardian?.sendVerifyCodeParams?.verifierId,
    [editGuardian, selectedVerifier],
  );

  const renderGuardianAccount = useCallback(() => {
    return (
      <View style={pageStyles.accountWrap}>
        <TextM style={pageStyles.accountLabel}>Guardian Info</TextM>
        {guardianItem && <GuardianAccountItem guardian={guardianItem} />}
      </View>
    );
  }, [guardianItem]);

  return (
    <PageContainer
      safeAreaColor={['blue', 'gray']}
      titleDom={t('Edit Guardians')}
      leftCallback={() => {
        onFinish({
          status: 'cancel',
        });
      }}
      containerStyles={pageStyles.pageWrap}
      scrollViewProps={{ disabled: true }}>
      <View style={pageStyles.contentWrap}>
        {renderGuardianAccount()}
        <TextM style={pageStyles.titleLabel}>{t('Verifier')}</TextM>
        <ListItem
          onPress={() => {
            VerifierSelectOverlay.showList({
              id: selectedVerifier?.id,
              labelAttrName: 'name',
              list: verifierList,
              callBack: onChooseVerifier,
            });
          }}
          titleLeftElement={
            selectedVerifier && (
              <VerifierImage
                style={pageStyles.verifierImageStyle}
                size={pTd(30)}
                label={selectedVerifier.name}
                uri={selectedVerifier.imageUrl}
              />
            )
          }
          titleStyle={[GStyles.flexRowWrap, GStyles.itemCenter]}
          titleTextStyle={[pageStyles.titleTextStyle, !selectedVerifier && FontStyles.font7]}
          style={pageStyles.verifierWrap}
          title={selectedVerifier?.name || t('Select guardian verifiers')}
          rightElement={<Svg size={pTd(20)} icon="down-arrow" />}
        />
        {guardianError.isError && <TextS style={pageStyles.errorTips}>{guardianError.errorMsg || ''}</TextS>}
      </View>

      <View>
        <>
          <CommonButton disabled={isApprovalDisable} type="primary" onPress={onApproval}>
            {t('Send Request')}
          </CommonButton>
          <CommonButton style={pageStyles.removeBtnWrap} type="clear" onPress={onRemove} titleStyle={FontStyles.font12}>
            {t('Remove')}
          </CommonButton>
        </>
      </View>
    </PageContainer>
  );
};

export const checkIsTheLastLoginGuardian = (
  guardianList: Array<GuardianConfig>,
  thisGuardian: GuardianConfig,
): boolean => {
  if (!thisGuardian.isLoginGuardian) {
    return false;
  }
  return !guardianList
    .filter(
      it =>
        it.sendVerifyCodeParams.verifierId !== thisGuardian.sendVerifyCodeParams.verifierId ||
        it.sendVerifyCodeParams.guardianIdentifier !== thisGuardian.sendVerifyCodeParams.guardianIdentifier ||
        it.sendVerifyCodeParams.type !== thisGuardian.sendVerifyCodeParams.type,
    )
    .find(it => it.isLoginGuardian);
};

export interface ModifyGuardianProps {
  particularGuardianInfo?: GuardianConfig;
  originalGuardianItem?: UserGuardianItem;
}

export default ModifyGuardian;
