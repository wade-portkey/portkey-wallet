import React, { memo } from 'react';
import Svg from '@portkey/rn-sdk/src/components/Svg';
import { dashBoardBtnStyle, innerPageStyles } from '@portkey/rn-sdk/src/components/SendButton/style';
// import navigationService from 'utils/navigationService';
import { TokenItemShowType } from '@portkey/rn-sdk/src/packages/types/types-ca/token';
import { View, TouchableOpacity } from 'react-native';
import { TextM } from '@portkey/rn-sdk/src/components/CommonText';
import { useLanguage } from '@portkey/rn-sdk/src/i18n/hooks';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import CommonToast from '@portkey/rn-sdk/src/components/CommonToast';

interface SendButtonType {
  themeType?: 'dashBoard' | 'innerPage';
  sentToken?: TokenItemShowType;
}

const SendButton = (props: SendButtonType) => {
  const { themeType = 'dashBoard' } = props;
  const styles = themeType === 'dashBoard' ? dashBoardBtnStyle : innerPageStyles;

  const { t } = useLanguage();

  return (
    <View style={styles.buttonWrap}>
      <TouchableOpacity
        style={[styles.iconWrapStyle, GStyles.alignCenter]}
        onPress={async () => {
          CommonToast.fail('Send is not available by now');
        }}>
        <Svg icon={themeType === 'dashBoard' ? 'send' : 'send1'} size={pTd(46)} />
      </TouchableOpacity>
      <TextM style={styles.titleStyle}>{t('Send')}</TextM>
    </View>
  );
};

export default memo(SendButton);
