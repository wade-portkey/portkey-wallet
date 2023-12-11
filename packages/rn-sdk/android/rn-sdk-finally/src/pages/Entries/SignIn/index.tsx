import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import BaseContainer, { BaseContainerProps, BaseContainerState } from '@portkey/rn-sdk/src/model/container/BaseContainer';
import SignInPortkey from '@portkey/rn-sdk/src/pages/Login/LoginPortkey';
import React from 'react';
import BaseContainerContext from '@portkey/rn-sdk/src/model/container/BaseContainerContext';
import { CountryCodeItem } from '@portkey/rn-sdk/src/types/wallet';
import { GlobalStorage } from '@portkey/rn-sdk/src/service/storage';
import { CURRENT_USING_COUNTRY_CODE } from '@portkey/rn-sdk/src/model/global';

export default class SignInEntryPage extends BaseContainer<SignInPageProps, SignInPageState, SignInPageResult> {
  constructor(props: BaseContainerProps) {
    super(props);
    this.checkMMKVStorage();
    this.state = {
      currentCountryCodeItem: null,
      useSignIn: false,
      accountIdentifierType: AccountIdentifierType.PHONE_NUMBER,
      enableSubmitButton: false,
    };
  }

  checkMMKVStorage = async () => {
    const cache = await GlobalStorage.getString(CURRENT_USING_COUNTRY_CODE);
    cache &&
      this.setState({
        currentCountryCodeItem: JSON.parse(cache),
      });
  };

  updateCountryCode = (countryCode: CountryCodeItem) => {
    this.setState({
      currentCountryCodeItem: countryCode,
    });
  };

  getEntryName = (): string => PortkeyEntries.SIGN_IN_ENTRY;

  render() {
    return (
      <>
        <BaseContainerContext.Provider value={{ entryName: this.getEntryName() }}>
          <SignInPortkey
            selectedCountryCode={this.state.currentCountryCodeItem}
            updateCountryCode={this.updateCountryCode}
          />
        </BaseContainerContext.Provider>
      </>
    );
  }
}

export interface SignInPageProps extends BaseContainerProps {}

export interface SignInPageState extends BaseContainerState {
  useSignIn: boolean;
  accountIdentifierType: AccountIdentifierType;
  enableSubmitButton: boolean;
  currentCountryCodeItem: CountryCodeItem | null;
}

export enum AccountIdentifierType {
  PHONE_NUMBER = 0,
  EMAIL = 1,
}

export interface SignInPageResult {}
