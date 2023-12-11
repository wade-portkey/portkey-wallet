import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import WebView from 'react-native-webview';
import CustomHeader from '@portkey/rn-sdk/src/components/CustomHeader';
import SafeAreaBox from '@portkey/rn-sdk/src/components/SafeAreaBox';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import { ACH_REDIRECT_URL, ACH_WITHDRAW_URL } from '@portkey/rn-sdk/src/constants/common';
import CommonToast from '@portkey/rn-sdk/src/components/CommonToast';
import Progressbar, { IProgressbar } from '@portkey/rn-sdk/src/components/Progressbar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';

const safeAreaColorMap = {
  white: defaultColors.bg1,
  blue: defaultColors.bg5,
  gray: defaultColors.bg4,
  transparent: 'transparent',
};

export type SafeAreaColorMapKeyUnit = keyof typeof safeAreaColorMap;

type WebViewPageType = 'default' | 'ach' | 'achSell';

export interface AchSellParams {
  orderNo?: string;
}

const ViewOnWebView = ({
  title = '',
  url,
  webViewPageType = 'default',
  injectedJavaScript,
  params,
}: {
  url: string;
  title?: string;
  webViewPageType?: WebViewPageType;
  injectedJavaScript?: string;
  params?: any;
}) => {
  const [browserInfo] = useState({ url, title });

  const webViewRef = React.useRef<WebView>(null);
  const progressBarRef = React.useRef<IProgressbar>(null);

  const isAchSellHandled = useRef(false);

  const handleNavigationStateChange = useCallback(
    (navState: any) => {
      if (webViewPageType === 'default') return;
      if (webViewPageType === 'achSell') {
        if (navState.url.startsWith(ACH_WITHDRAW_URL) && !isAchSellHandled.current) {
          isAchSellHandled.current = true;
          const { orderNo } = (params as AchSellParams) || {};
          if (!orderNo) {
            CommonToast.failError('Transaction failed.');
            return;
          }
        }
      }
    },
    [params, webViewPageType],
  );

  return (
    <SafeAreaProvider style={GStyles.whiteBackgroundColor}>
      <SafeAreaBox edges={['top', 'right', 'left']} style={[{ backgroundColor: safeAreaColorMap.blue }]}>
        {<CustomHeader themeType={'blue'} titleDom={browserInfo?.title} />}
        <View style={pageStyles.contentWrap}>
          <Progressbar ref={progressBarRef} />
          <WebView
            ref={webViewRef}
            style={pageStyles.webView}
            source={{ uri: url ?? '' }}
            onNavigationStateChange={handleNavigationStateChange}
            // cacheEnabled={false}
            injectedJavaScript={injectedJavaScript}
            // incognito={incognito}
            applicationNameForUserAgent={'View Only WebView Portkey did Mobile'}
            onLoadProgress={({ nativeEvent }) => progressBarRef.current?.changeInnerBarWidth(nativeEvent.progress)}
          />
        </View>
      </SafeAreaBox>
    </SafeAreaProvider>
  );
};

export default ViewOnWebView;

export const pageStyles = StyleSheet.create({
  pageWrap: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: defaultColors.bg1,
  },
  svgWrap: {
    marginRight: pTd(16),
  },
  contentWrap: {
    position: 'relative',
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  webView: {
    width: '100%',
    flex: 1,
  },
});
