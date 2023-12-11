import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { BGStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import useEffectOnce from '@portkey/rn-sdk/src/hooks/useEffectOnce';
import { useLanguage } from '@portkey/rn-sdk/src/i18n/hooks';
import styles from '@portkey/rn-sdk/src/pages/Login/styles';
import CommonButton from '@portkey/rn-sdk/src/components/CommonButton';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import { PageLoginType, PageType } from '@portkey/rn-sdk/src/pages/Login/types';
import Button from '@portkey/rn-sdk/src/pages/Login/components/Button';
import PhoneInput from '@portkey/rn-sdk/src/components/PhoneInput';
import { getCachedCountryCodeData } from '@portkey/rn-sdk/src/model/global';
import { CountryCodeItem, defaultCountryCode } from '@portkey/rn-sdk/src/types/wallet';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import { AccountOriginalType } from '@portkey/rn-sdk/src/model/verify/core';
import useBaseContainer from '@portkey/rn-sdk/src/model/container/UseBaseContainer';
import TermsServiceButton from '@portkey/rn-sdk/src/pages/Login/components/TermsServiceButton';
import { useVerifyEntry } from '@portkey/rn-sdk/src/model/verify/entry';
import { doubleClick } from '@portkey/rn-sdk/src/utils/commonUtil';

const TitleMap = {
  [PageType.login]: {
    button: 'Log In',
  },
  [PageType.signup]: {
    button: 'Sign up',
  },
};

export default function Phone({
  setLoginType,
  type = PageType.login,
  selectedCountryCode,
  updateCountryCode,
}: {
  setLoginType: (type: PageLoginType) => void;
  type?: PageType;
  selectedCountryCode?: CountryCodeItem | null;
  updateCountryCode?: (item: CountryCodeItem) => void;
}) {
  const { t } = useLanguage();
  const [loading] = useState<boolean>();
  const [loginAccount, setLoginAccount] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [country, setCountry] = useState<CountryCodeItem>();

  const { navigateForResult } = useBaseContainer({
    entryName: type === PageType.signup ? PortkeyEntries.SIGN_UP_ENTRY : PortkeyEntries.SIGN_IN_ENTRY,
  });

  useEffectOnce(() => {
    checkMMKVStorage();
  });

  const checkMMKVStorage = async () => {
    const countryDTO = await getCachedCountryCodeData();
    setCountry(countryDTO?.locateData);
  };

  const getWrappedPhoneNumber = useCallback(() => {
    const countryCode = (selectedCountryCode ?? country ?? defaultCountryCode)?.code;
    return `+${countryCode}${loginAccount}`;
  }, [loginAccount, country, selectedCountryCode]);

  const { verifyEntry } = useVerifyEntry({
    type,
    accountOriginalType: AccountOriginalType.Phone,
    entryName: type === PageType.login ? PortkeyEntries.SIGN_IN_ENTRY : PortkeyEntries.SIGN_UP_ENTRY,
    setErrorMessage,
  });

  return (
    <View style={[BGStyles.bg1, styles.card, GStyles.itemCenter]}>
      <View style={GStyles.width100}>
        <View style={[GStyles.flexRowWrap, GStyles.marginBottom(20)]}>
          <Button
            title="Phone"
            isActive
            style={GStyles.marginRight(8)}
            onPress={() => setLoginType(PageLoginType.phone)}
          />
          <Button title="Email" onPress={() => setLoginType(PageLoginType.email)} />
        </View>

        <PhoneInput
          value={loginAccount}
          errorMessage={errorMessage}
          containerStyle={styles.inputContainerStyle}
          onChangeText={setLoginAccount}
          onCountryChange={updateCountryCode}
          selectCountry={selectedCountryCode ?? country}
          navigateForResult={navigateForResult}
        />

        <CommonButton
          containerStyle={GStyles.marginTop(16)}
          disabled={!loginAccount}
          type="primary"
          loading={loading}
          onPress={() => {
            // verifyEntry(getWrappedPhoneNumber());
            doubleClick(verifyEntry, getWrappedPhoneNumber());
          }}>
          {t(TitleMap[type].button)}
        </CommonButton>
      </View>
      <TermsServiceButton />
    </View>
  );
}
