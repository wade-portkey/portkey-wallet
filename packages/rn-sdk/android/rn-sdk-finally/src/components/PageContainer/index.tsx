import React, { ReactNode, useMemo } from 'react';
import CustomHeader, { CustomHeaderProps } from '@portkey/rn-sdk/src/components/CustomHeader';
import SafeAreaBox, { SafeAreaBoxProps } from '@portkey/rn-sdk/src/components/SafeAreaBox';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';
import { TouchableWithoutFeedback, View, Keyboard, StatusBar, StyleSheet } from 'react-native';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import { ViewStyleType } from '@portkey/rn-sdk/src/types/styles';
import { getStatusBarHeight } from '@portkey/rn-sdk/src/utils/screen';

const safeAreaColorMap = {
  white: defaultColors.bg1,
  blue: defaultColors.bg5,
  gray: defaultColors.bg4,
  transparent: 'transparent',
};

const styles = StyleSheet.create({
  pagePaddingTop: {
    paddingTop: getStatusBarHeight(true),
  },
});

export type SafeAreaColorMapKeyUnit = keyof typeof safeAreaColorMap;

export default function PageContainer({
  safeAreaColor = ['white', 'white'],
  children,
  safeAreaProps,
  containerStyles,
  scrollViewProps,
  hideHeader,
  hideTouchable,
  pageSafeBottomPadding,
  ...props
}: CustomHeaderProps & {
  safeAreaColor?: SafeAreaColorMapKeyUnit[]; // top and bottom safeArea color
  children?: ReactNode;
  safeAreaProps?: SafeAreaBoxProps[];
  scrollViewProps?: KeyboardAwareScrollViewProps & {
    disabled?: boolean; // disabled scrollView
  };
  containerStyles?: ViewStyleType;
  hideHeader?: boolean;
  hideTouchable?: boolean;
  pageSafeBottomPadding?: boolean;
}) {
  const themeType = useMemo(() => safeAreaColor[0], [safeAreaColor]);
  return (
    <SafeAreaBox
      {...safeAreaProps}
      edges={['top', 'right', 'left']}
      style={[
        { backgroundColor: safeAreaColorMap[safeAreaColor[0]] },
        safeAreaProps?.[0]?.style,
        styles.pagePaddingTop,
      ]}>
      <SafeAreaBox
        edges={['bottom']}
        pageSafeBottomPadding={pageSafeBottomPadding}
        style={[{ backgroundColor: safeAreaColorMap[safeAreaColor[1]] }, safeAreaProps?.[1]?.style]}>
        {!hideHeader && <CustomHeader themeType={themeType} {...props} />}
        {themeType === 'white' && <StatusBar barStyle="dark-content" />}
        {scrollViewProps?.disabled ? (
          hideTouchable ? (
            <View style={containerStyles}>{children}</View>
          ) : (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={containerStyles}>{children}</View>
            </TouchableWithoutFeedback>
          )
        ) : (
          <KeyboardAwareScrollView
            keyboardOpeningTime={0}
            extraHeight={20}
            // alwaysBounceVertical={false}
            keyboardShouldPersistTaps="handled"
            // enableAutomaticScroll={false}
            enableOnAndroid={true}
            {...scrollViewProps}>
            <View style={containerStyles}>{children}</View>
          </KeyboardAwareScrollView>
        )}
      </SafeAreaBox>
    </SafeAreaBox>
  );
}
