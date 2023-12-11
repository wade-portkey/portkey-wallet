import React, { useMemo, useState } from 'react';
import PageContainer, { SafeAreaColorMapKeyUnit } from '@portkey/rn-sdk/src/components/PageContainer';
import { TextM, TextXXXL } from '@portkey/rn-sdk/src/components/CommonText';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import { ImageBackground, View } from 'react-native';
import { isIOS } from '@portkey/rn-sdk/src/packages/utils/mobile/device';
import { useLanguage } from '@portkey/rn-sdk/src/i18n/hooks';
import Svg from '@portkey/rn-sdk/src/components/Svg';
import { BGStyles, FontStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import styles from '@portkey/rn-sdk/src/pages/Login/styles';
import Email from '@portkey/rn-sdk/src/pages/Login/components/Email';
import Phone from '@portkey/rn-sdk/src/pages/Login/components/Phone';
import QRCode from '@portkey/rn-sdk/src/pages/Login/components/QRCode';
import Referral from '@portkey/rn-sdk/src/pages/Login/components/Referral';
import { PageLoginType, PageType } from '@portkey/rn-sdk/src/pages/Login/types';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import fonts from '@portkey/rn-sdk/src/assets/theme/fonts';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import useEffectOnce from '@portkey/rn-sdk/src/hooks/useEffectOnce';
import { checkForCountryCodeCached } from '@portkey/rn-sdk/src/model/global';
import useBaseContainer from '@portkey/rn-sdk/src/model/container/UseBaseContainer';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import NetworkContext from '@portkey/rn-sdk/src/pages/Login/context/NetworkContext';
import { NetworkItem } from '@portkey/rn-sdk/src/packages/types/types-ca/network';
import { PortkeyConfig, setEndPointUrl } from '@portkey/rn-sdk/src/global/constants';
import { NetworkList } from '@portkey/rn-sdk/src/packages/constants/constants-ca/network-mainnet';
import { CountryCodeItem } from '@portkey/rn-sdk/src/types/wallet';

const scrollViewProps = { extraHeight: 120 };
const safeAreaColor: SafeAreaColorMapKeyUnit[] = ['transparent', 'transparent'];

export default function LogInPortKey({
  selectedCountryCode,
  updateCountryCode,
}: {
  selectedCountryCode: CountryCodeItem | null;
  updateCountryCode: (item: CountryCodeItem) => void;
}) {
  const [loginType, setLoginType] = useState<PageLoginType>(PageLoginType.referral);
  const [currentNetwork, setCurrentNetwork] = useState<NetworkItem | undefined>(undefined);
  const { t } = useLanguage();
  const isMainnet = useMemo(() => {
    return currentNetwork?.networkType === 'MAIN';
  }, [currentNetwork?.networkType]);
  const { onFinish } = useBaseContainer({
    entryName: PortkeyEntries.SIGN_IN_ENTRY,
  });
  const loginMap = useMemo(
    () => ({
      [PageLoginType.email]: <Email setLoginType={setLoginType} />,
      [PageLoginType.qrCode]: <QRCode setLoginType={setLoginType} />,
      [PageLoginType.phone]: (
        <Phone
          setLoginType={setLoginType}
          selectedCountryCode={selectedCountryCode}
          updateCountryCode={updateCountryCode}
        />
      ),
      [PageLoginType.referral]: <Referral setLoginType={setLoginType} type={PageType.login} />,
    }),
    [selectedCountryCode, updateCountryCode],
  );
  useEffectOnce(() => {
    checkForCountryCodeCached();
    loadCurrentNetwork();
  });
  const loadCurrentNetwork = () => {
    PortkeyConfig.endPointUrl().then(url => {
      const network = NetworkList.find(item => item.apiUrl === url) || NetworkList[0];
      setCurrentNetwork(network);
    });
  };

  const onBack = () => {
    if (loginType !== PageLoginType.referral) {
      setLoginType(PageLoginType.referral);
    } else {
      onFinish({
        status: 'cancel',
        data: {},
      });
    }
  };

  const backgroundImage = useMemo(() => {
    if (isIOS) {
      return { uri: 'background' };
    } else {
      return require('../img/background.png');
    }
  }, []);

  const networkContext = {
    currentNetwork: currentNetwork,
    changeCurrentNetwork: (network: NetworkItem) => {
      if (network.apiUrl) {
        setCurrentNetwork(network);
        setEndPointUrl(network.apiUrl);
      }
    },
  };

  return (
    <NetworkContext.Provider value={networkContext}>
      <ImageBackground style={styles.backgroundContainer} resizeMode="cover" source={backgroundImage}>
        <PageContainer
          titleDom
          type="leftBack"
          themeType="blue"
          style={BGStyles.transparent}
          pageSafeBottomPadding={!isIOS}
          containerStyles={styles.containerStyles}
          safeAreaColor={safeAreaColor}
          scrollViewProps={scrollViewProps}
          leftCallback={onBack}>
          <Svg icon="logo-icon" size={pTd(60)} iconStyle={styles.logoIconStyle} color={defaultColors.bg1} />
          <View style={GStyles.center}>
            {!isMainnet && (
              <View style={styles.labelBox}>
                <TextM style={[FontStyles.font11, fonts.mediumFont]}>TEST</TextM>
              </View>
            )}
            <TextXXXL style={[styles.titleStyle, FontStyles.font11]}>{t('Log In To Portkey')}</TextXXXL>
          </View>
          {loginMap[loginType]}
          {/* <SwitchNetwork /> */}
        </PageContainer>
      </ImageBackground>
    </NetworkContext.Provider>
  );
}
