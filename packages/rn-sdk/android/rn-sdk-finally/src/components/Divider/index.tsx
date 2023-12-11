import React from 'react';
import { View, StyleSheet } from 'react-native';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import { TextStyleType, ViewStyleType } from '@portkey/rn-sdk/src/types/styles';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import { TextM } from '@portkey/rn-sdk/src/components/CommonText';
import { FontStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';

export interface DividerProps {
  style?: ViewStyleType;
  lineStyle?: ViewStyleType;
  width?: number;
  insetType?: 'middle' | 'left' | 'right';
  inset?: boolean;
  title?: string;
  color?: string;
  titleStyle?: TextStyleType;
}

const Divider: React.FC<DividerProps> = ({
  style,
  width = StyleSheet.hairlineWidth,
  insetType = 'middle',
  title,
  color = defaultColors.border6,
  titleStyle,
  inset,
  lineStyle,
}) => {
  const linStyle = [{ height: width, backgroundColor: color }, lineStyle];
  const textStyle = [FontStyles.font7, styles[`${insetType}Title`], titleStyle];
  if (title && inset)
    return (
      <View style={[GStyles.flexRowWrap, GStyles.itemCenter, style]}>
        {insetType === 'left' && <TextM style={textStyle}>{title}</TextM>}
        <View style={[GStyles.flex1, linStyle]} />
        {insetType === 'middle' && <TextM style={textStyle}>{title}</TextM>}
        <View style={[GStyles.flex1, linStyle]} />
        {insetType === 'right' && <TextM style={textStyle}>{title}</TextM>}
      </View>
    );
  return <View style={[linStyle, style]} />;
};

export default Divider;

export const styles = StyleSheet.create({
  middleTitle: {
    marginHorizontal: pTd(16),
  },
  leftTitle: {
    marginRight: pTd(16),
  },
  rightTitle: {
    marginLeft: pTd(16),
  },
});
