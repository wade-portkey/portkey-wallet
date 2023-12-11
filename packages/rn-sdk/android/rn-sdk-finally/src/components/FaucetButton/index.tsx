import React, { memo, useCallback, useRef } from 'react';
import Svg from '@portkey/rn-sdk/src/components/Svg';
import { dashBoardBtnStyle, innerPageStyles } from '@portkey/rn-sdk/src/components/FaucetButton/style';
import { TokenItemShowType } from '@portkey/rn-sdk/src/packages/types/types-ca/token';

import { View, TouchableOpacity } from 'react-native';
import { TextM } from '@portkey/rn-sdk/src/components/CommonText';
import { useLanguage } from '@portkey/rn-sdk/src/i18n/hooks';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import CommonToast from '@portkey/rn-sdk/src/components/CommonToast';
import { callFaucetMethod } from '@portkey/rn-sdk/src/model/contract/handler';
import { isWalletUnlocked } from '@portkey/rn-sdk/src/model/verify/core';
import { getCurrentNetworkType } from '@portkey/rn-sdk/src/model/hooks/network';
interface SendButtonType {
  themeType?: 'dashBoard' | 'innerPage';
  sentToken?: TokenItemShowType;
}

const FaucetButton = (props: SendButtonType) => {
  const { themeType = 'dashBoard' } = props;
  const styles = themeType === 'dashBoard' ? dashBoardBtnStyle : innerPageStyles;
  const { t } = useLanguage();

  const isLoading = useRef<boolean>(false);

  const claimToken = useCallback(async () => {
    if (!(await isWalletUnlocked())) return;
    CommonToast.loading('Your ELF is on its way');

    if (isLoading.current) return;
    isLoading.current = true;
    try {
      const rst = await callFaucetMethod();
      if (rst.error) {
        throw rst.error;
      }
      CommonToast.success(`Token successfully requested`);
    } catch (error) {
      console.log(error);
      CommonToast.warn(`Today's limit has been reached`);
    }
    isLoading.current = false;
  }, []);

  return (
    <View style={styles.buttonWrap}>
      <TouchableOpacity
        style={[styles.iconWrapStyle, GStyles.alignCenter]}
        onPress={async () => {
          const networkType = await getCurrentNetworkType();
          if (networkType !== 'TESTNET') return;
          claimToken();
        }}>
        <Svg icon={themeType === 'dashBoard' ? 'faucet' : 'faucet1'} size={pTd(46)} />
      </TouchableOpacity>
      <TextM style={styles.titleStyle}>{t('Faucet')}</TextM>
    </View>
  );
};

export default memo(FaucetButton);
