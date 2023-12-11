import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BGStyles, FontStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import styles from '@portkey/rn-sdk/src/pages/Login/styles';
import Touchable from '@portkey/rn-sdk/src/components/Touchable';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import { TextL } from '@portkey/rn-sdk/src/components/CommonText';
import Svg from '@portkey/rn-sdk/src/components/Svg';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import CommonButton from '@portkey/rn-sdk/src/components/CommonButton';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import useBaseContainer from '@portkey/rn-sdk/src/model/container/UseBaseContainer';
import { AccountOriginalType, isWalletExists, isWalletUnlocked } from '@portkey/rn-sdk/src/model/verify/core';
import CommonToast from '@portkey/rn-sdk/src/components/CommonToast';
import useEffectOnce from '@portkey/rn-sdk/src/hooks/useEffectOnce';
import { CheckPinProps, CheckPinResult } from '@portkey/rn-sdk/src/pages/Pin/CheckPin';
import { SignInPageProps, SignInPageResult } from '@portkey/rn-sdk/src/pages/Entries/SignIn';
import TermsServiceButton from '@portkey/rn-sdk/src/pages/Login/components/TermsServiceButton';
import Divider from '@portkey/rn-sdk/src/components/Divider';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import { PageLoginType, PageType } from '@portkey/rn-sdk/src/pages/Login/types';
import { useVerifyEntry } from '@portkey/rn-sdk/src/model/verify/entry';
import { isIOS } from '@portkey/rn-sdk/src/packages/utils/mobile/device';
import { getOrReadCachedVerifierData } from '@portkey/rn-sdk/src/model/contract/handler';
import Loading from '@portkey/rn-sdk/src/components/Loading';
import { getUnlockedWallet } from '@portkey/rn-sdk/src/model/wallet';

const TitleMap = {
  [PageType.login]: {
    apple: 'Login with Apple',
    google: 'Login with Google',
    button: 'Login with Phone / Email',
  },
  [PageType.signup]: {
    apple: 'Signup with Apple',
    google: 'Signup with Google',
    button: 'Signup with Phone / Email',
  },
};

export default function Referral({
  setLoginType,
  type = PageType.login,
}: {
  setLoginType: (type: PageLoginType) => void;
  type?: PageType;
}) {
  const { onFinish, navigateForResult, getEntryName } = useBaseContainer({
    entryName: PortkeyEntries.SIGN_IN_ENTRY,
  });

  const setErrorMessage = (msg?: string) => {
    if (msg) {
      CommonToast.failError(msg);
    }
  };

  const { thirdPartyLogin } = useVerifyEntry({
    type,
    accountOriginalType: AccountOriginalType.Apple,
    entryName: getEntryName() as PortkeyEntries,
    setErrorMessage,
  });

  const onSuccess = async (text = 'sign in / sign up success') => {
    const walletInfo = await getUnlockedWallet();
    onFinish({
      status: 'success',
      data: {
        finished: true,
        msg: text,
        walletInfo,
      },
    });
  };

  const pushToSignUp = () => {
    navigateForResult<SignInPageResult, SignInPageProps>(PortkeyEntries.SIGN_UP_ENTRY, {}, res => {
      if (res.status === 'success') {
        onSuccess();
      }
    });
  };

  useEffectOnce(async () => {
    walletCheck();
    Loading.show();
    try {
      await getOrReadCachedVerifierData();
    } catch (_) {}
    Loading.hide();
  });

  const walletCheck = async () => {
    if (await isWalletExists()) {
      if (await isWalletUnlocked()) {
        onSuccess('you have already signed in');
      } else {
        const tryToUnlock = async () => {
          navigateForResult<CheckPinResult, CheckPinProps>(PortkeyEntries.CHECK_PIN, {}, res => {
            if (res.status === 'success') {
              onSuccess('wallet unlock success');
            } else {
              onFinish({
                status: 'cancel',
                data: {
                  finished: false,
                  msg: 'unlock cancelled',
                },
              });
            }
          });
        };
        tryToUnlock();
      }
    }
  };

  const onGoogleSign = useCallback(() => {
    thirdPartyLogin('google');
  }, [thirdPartyLogin]);
  const onAppleSign = useCallback(() => {
    thirdPartyLogin('apple');
  }, [thirdPartyLogin]);

  const qrcodeImage = useMemo(() => {
    if (isIOS) {
      return { uri: 'QR-code' };
    } else {
      return require('../../../assets/image/pngs/QR-code.png');
    }
  }, []);

  return (
    <View style={[BGStyles.bg1, styles.card, GStyles.itemCenter, GStyles.spaceBetween]}>
      {type === PageType.login && (
        <Touchable style={styles.iconBox} onPress={() => setLoginType(PageLoginType.qrCode)}>
          <Image source={qrcodeImage} style={styles.iconStyle} />
        </Touchable>
      )}
      <View style={GStyles.width100}>
        <CommonButton
          type="outline"
          onPress={onGoogleSign}
          title={TitleMap[type].google}
          icon={<Svg icon="google" size={24} />}
          containerStyle={pageStyles.outlineContainerStyle}
          titleStyle={[FontStyles.font3, pageStyles.outlineTitleStyle]}
        />

        <CommonButton
          type="outline"
          onPress={onAppleSign}
          title={TitleMap[type].apple}
          icon={<Svg icon="apple" size={24} />}
          containerStyle={pageStyles.outlineContainerStyle}
          titleStyle={[FontStyles.font3, pageStyles.outlineTitleStyle]}
        />

        <Divider title="OR" inset={true} style={pageStyles.dividerStyle} />
        <CommonButton type="primary" onPress={() => setLoginType(PageLoginType.phone)} title={TitleMap[type].button} />
      </View>
      {type === PageType.login && (
        <Touchable style={[GStyles.flexRowWrap, GStyles.itemCenter, styles.signUpTip]} onPress={pushToSignUp}>
          <TextL style={FontStyles.font3}>
            No account? <Text style={FontStyles.font4}>Sign up </Text>
          </TextL>
          <Svg size={pTd(20)} color={FontStyles.font4.color} icon="right-arrow2" />
        </Touchable>
      )}
      <TermsServiceButton />
    </View>
  );
}

const pageStyles = StyleSheet.create({
  outlineContainerStyle: {
    marginTop: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: defaultColors.border1,
  },
  outlineTitleStyle: {
    marginLeft: 12,
  },
  dividerStyle: {
    marginVertical: 16,
  },
  skeleton: {
    height: '100%',
    width: '100%',
  },
});
