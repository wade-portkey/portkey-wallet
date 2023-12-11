import React from 'react';
import Svg from '@portkey/rn-sdk/src/components/Svg';
import { TouchableOpacity, View } from 'react-native';
import { dashBoardBtnStyle, innerPageStyles } from '@portkey/rn-sdk/src/components/SendButton/style';
import { TextM } from '@portkey/rn-sdk/src/components/CommonText';
import { useLanguage } from '@portkey/rn-sdk/src/i18n/hooks';
import TokenOverlay from '@portkey/rn-sdk/src/components/TokenOverlay';
import { TokenItemShowType } from '@portkey/rn-sdk/src/packages/types/types-ca/token';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import useBaseContainer from '@portkey/rn-sdk/src/model/container/UseBaseContainer';

interface SendButtonType {
  currentTokenInfo?: TokenItemShowType;
  themeType?: 'dashBoard' | 'innerPage';
  receiveButton?: any;
}

export default function ReceiveButton(props: SendButtonType) {
  const { themeType = 'dashBoard' } = props;
  const { t } = useLanguage();
  const { navigateTo: navigationTo } = useBaseContainer({
    entryName: PortkeyEntries.ASSETS_HOME_ENTRY,
  });
  const styles = themeType === 'dashBoard' ? dashBoardBtnStyle : innerPageStyles;

  return (
    <View style={styles.buttonWrap}>
      <TouchableOpacity
        style={[styles.iconWrapStyle, GStyles.alignCenter]}
        onPress={() => {
          if (themeType === 'innerPage') throw new Error('ReceiveButton: not supported');

          TokenOverlay.showTokenList({
            onFinishSelectToken: (tokenInfo: TokenItemShowType) => {
              navigationTo(PortkeyEntries.RECEIVE_TOKEN_ENTRY, { params: tokenInfo });
            },
          });
        }}>
        <Svg icon={themeType === 'dashBoard' ? 'receive' : 'receive1'} size={pTd(46)} />
      </TouchableOpacity>
      <TextM style={styles.titleStyle}>{t('Receive')}</TextM>
    </View>
  );
}
