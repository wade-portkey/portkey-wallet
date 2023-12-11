import React, { useCallback, useMemo } from 'react';
import PageContainer from '@portkey/rn-sdk/src/components/PageContainer';
import useBiometricsReady from '@portkey/rn-sdk/src/hooks/useBiometrics';
import { StyleSheet } from 'react-native';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import { useLanguage } from '@portkey/rn-sdk/src/i18n/hooks';
import MenuItem from '@portkey/rn-sdk/src/pages/My/components/MenuItem';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import BaseContainerContext from '@portkey/rn-sdk/src/model/container/BaseContainerContext';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import useBaseContainer from '@portkey/rn-sdk/src/model/container/UseBaseContainer';
import { CheckPinProps } from '@portkey/rn-sdk/src/pages/Pin/CheckPin';
import useEffectOnce from '@portkey/rn-sdk/src/hooks/useEffectOnce';
import { isWalletUnlocked } from '@portkey/rn-sdk/src/model/verify/core';
import { PortkeyModulesEntity } from '@portkey/rn-sdk/src/service/native-modules';
import CommonToast from '@portkey/rn-sdk/src/components/CommonToast';
export default function AccountSettings() {
  const biometricsReady = useBiometricsReady();
  const { navigateTo: navigationTo, onFinish } = useBaseContainer({
    entryName: PortkeyEntries.ACCOUNT_SETTING_ENTRY,
    onNewIntent: (params: { modified: boolean }) => {
      console.log('params.modified', params.modified);
      if (params.modified) {
        console.log('params.modified if');
        CommonToast.success(t('Modified Successfully'));
      }
    },
  });
  const { t } = useLanguage();

  const list = useMemo(() => {
    const _list: Array<{
      name: string;
      label: string;
      sort: number;
    }> = [
      {
        name: 'CheckPin',
        label: 'Change Pin',
        sort: 1,
      },
    ];

    biometricsReady &&
      _list.push({
        name: 'Biometric',
        label: 'Biometric Authentication',
        sort: 2,
      });
    return _list.sort((a, b) => a.sort - b.sort);
  }, [biometricsReady]);
  const navigateNextPage = useCallback(
    (menuName: string) => {
      console.log('menuName', menuName);
      if (menuName === 'CheckPin') {
        navigationTo<CheckPinProps>(PortkeyEntries.CHECK_PIN, { targetScene: 'changePin' });
      } else if (menuName === 'Biometric') {
        navigationTo(PortkeyEntries.BIOMETRIC_SWITCH_ENTRY, {});
      }
    },
    [navigationTo],
  );
  useEffectOnce(() => {
    isWalletUnlocked().then(status => {
      if (!status) {
        onFinish({
          status: 'fail',
          data: { msg: 'wallet is not unlocked' },
        });
        console.log('wallet is not unlocked');
        PortkeyModulesEntity.NativeWrapperModule.onError(
          PortkeyEntries.ACCOUNT_SETTING_ENTRY,
          'wallet is not unlocked',
          {},
        );
      }
    });
  });
  return (
    <BaseContainerContext.Provider value={{ entryName: PortkeyEntries.ACCOUNT_SETTING_ENTRY }}>
      <PageContainer
        containerStyles={styles.containerStyles}
        safeAreaColor={['blue', 'gray']}
        titleDom={t('Account Setting')}>
        {list.map(item => (
          <MenuItem
            style={styles.itemWrap}
            key={item.name}
            title={t(item.label)}
            onPress={() => navigateNextPage(item.name)}
          />
        ))}
      </PageContainer>
    </BaseContainerContext.Provider>
  );
}

const styles = StyleSheet.create({
  containerStyles: {
    backgroundColor: defaultColors.bg4,
  },
  itemWrap: {
    marginTop: pTd(24),
    marginBottom: 0,
  },
});
