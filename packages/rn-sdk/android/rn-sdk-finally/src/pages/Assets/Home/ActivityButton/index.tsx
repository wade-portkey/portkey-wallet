import React, { memo } from 'react';
import Svg from '@portkey/rn-sdk/src/components/Svg';
import { dashBoardBtnStyle, innerPageStyles } from '@portkey/rn-sdk/src/components/SendButton/style';

import { View, TouchableOpacity } from 'react-native';
import { TextM } from '@portkey/rn-sdk/src/components/CommonText';
import { useLanguage } from '@portkey/rn-sdk/src/i18n/hooks';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';

interface ActivityButtonProps {
  themeType?: 'dashBoard' | 'innerPage';
}

const ActivityButton = (props: ActivityButtonProps) => {
  const { themeType = 'dashBoard' } = props;
  const { t } = useLanguage();
  const styles = themeType === 'dashBoard' ? dashBoardBtnStyle : innerPageStyles;

  return (
    <View style={styles.buttonWrap}>
      <TouchableOpacity
        style={[styles.iconWrapStyle, GStyles.alignCenter]}
        onPress={() => {
          // return navigationService.navigate('ActivityListPage');
        }}>
        <Svg icon={'activity'} size={pTd(46)} />
      </TouchableOpacity>
      <TextM style={styles.titleStyle}>{t('Activity')}</TextM>
    </View>
  );
};

export default memo(ActivityButton);
