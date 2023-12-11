import OverlayModal from '@portkey/rn-sdk/src/components/OverlayModal';
import Touchable from '@portkey/rn-sdk/src/components/Touchable';
import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { overlayStyles } from '@portkey/rn-sdk/src/components/OverlayModal/OverlayBody/styles';

export default function OverlayBody({
  type = 'bottom',
  style,
  children,
}: {
  type?: 'bottom' | 'center';
  children?: ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View style={[overlayStyles[`${type}Box`], style]}>
      <Touchable style={overlayStyles.headerRow} onPress={OverlayModal.hide}>
        <View style={overlayStyles.headerIcon} />
      </Touchable>
      {children}
    </View>
  );
}
