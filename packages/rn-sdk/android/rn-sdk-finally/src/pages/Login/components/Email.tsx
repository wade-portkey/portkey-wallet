import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { checkEmail } from '@portkey/rn-sdk/src/packages/utils/check';
import { BGStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import { useLanguage } from '@portkey/rn-sdk/src/i18n/hooks';
import styles from '@portkey/rn-sdk/src/pages/Login/styles';
import CommonInput from '@portkey/rn-sdk/src/components/CommonInput';
import CommonButton from '@portkey/rn-sdk/src/components/CommonButton';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import { PageLoginType, PageType } from '@portkey/rn-sdk/src/pages/Login/types';
import Button from '@portkey/rn-sdk/src/pages/Login/components/Button';
import { AccountOriginalType } from '@portkey/rn-sdk/src/model/verify/core';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
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

export default function Email({
  setLoginType,
  type = PageType.login,
}: {
  setLoginType: (type: PageLoginType) => void;
  type?: PageType;
}) {
  const { t } = useLanguage();
  const iptRef = useRef<any>();
  const [loading] = useState<boolean>();
  const [email, setEmail] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const { verifyEntry } = useVerifyEntry({
    type,
    accountOriginalType: AccountOriginalType.Email,
    entryName: type === PageType.login ? PortkeyEntries.SIGN_IN_ENTRY : PortkeyEntries.SIGN_UP_ENTRY,
    setErrorMessage,
    verifyAccountIdentifier: checkEmail,
  });

  const handleEmailChange = (msg: string) => {
    setEmail(msg);
    setErrorMessage(undefined);
  };

  return (
    <View style={[BGStyles.bg1, styles.card, GStyles.itemCenter]}>
      <View style={GStyles.width100}>
        <View style={[GStyles.flexRowWrap, GStyles.marginBottom(20)]}>
          <Button title="Phone" style={GStyles.marginRight(8)} onPress={() => setLoginType(PageLoginType.phone)} />
          <Button isActive title="Email" onPress={() => setLoginType(PageLoginType.email)} />
        </View>
        <CommonInput
          ref={iptRef}
          value={email}
          type="general"
          autoCorrect={false}
          onChangeText={handleEmailChange}
          errorMessage={errorMessage}
          keyboardType="email-address"
          placeholder={t('Enter Email')}
          containerStyle={styles.inputContainerStyle}
        />
        <CommonButton
          containerStyle={GStyles.marginTop(16)}
          disabled={!email}
          type="primary"
          loading={loading}
          onPress={() => {
            doubleClick(verifyEntry, email ?? '');
          }}>
          {t(TitleMap[type].button)}
        </CommonButton>
      </View>
      <TermsServiceButton />
    </View>
  );
}
