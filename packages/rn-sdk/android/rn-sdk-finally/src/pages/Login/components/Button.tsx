import { BGStyles, FontStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import { TextM } from '@portkey/rn-sdk/src/components/CommonText';
import Touchable from '@portkey/rn-sdk/src/components/Touchable';
import React from 'react';
import { StyleSheet, TouchableOpacityProps } from 'react-native';
import { TextStyleType, ViewStyleType } from '@portkey/rn-sdk/src/types/styles';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';

export default function Button({
  onPress,
  title,
  isActive,
  titleText,
  style,
}: {
  style?: ViewStyleType;
  title: string;
  onPress: TouchableOpacityProps['onPress'];
  isActive?: boolean;
  titleText?: TextStyleType;
}) {
  return (
    <Touchable
      disabled={isActive}
      onPress={onPress}
      style={[styles.container, isActive ? BGStyles.bg6 : undefined, style]}>
      <TextM style={[FontStyles.font7, isActive ? [FontStyles.font5, FontStyles.weight500] : undefined, titleText]}>
        {title}
      </TextM>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: pTd(12),
    borderRadius: 6,
    minHeight: 32,
  },
});
