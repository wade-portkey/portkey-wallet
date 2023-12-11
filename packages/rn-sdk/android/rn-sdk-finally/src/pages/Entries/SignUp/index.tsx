import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import BaseContainer, { BaseContainerProps } from '@portkey/rn-sdk/src/model/container/BaseContainer';
import SignupPortkey from '@portkey/rn-sdk/src/pages/Login/SignupPortkey';
import React from 'react';
import { CountryCodeItem } from '@portkey/rn-sdk/src/types/wallet';
import { GlobalStorage } from '@portkey/rn-sdk/src/service/storage';
import { CURRENT_USING_COUNTRY_CODE } from '@portkey/rn-sdk/src/model/global';
import BaseContainerContext from '@portkey/rn-sdk/src/model/container/BaseContainerContext';

export default class SignUpEntryPage extends BaseContainer<BaseContainerProps, SignUpPageState, SignUpPageResult> {
  constructor(props: BaseContainerProps) {
    super(props);
    this.state = {
      currentCountryCodeItem: null,
    };
  }

  checkMMKVStorage = async () => {
    const cache = await GlobalStorage.getString(CURRENT_USING_COUNTRY_CODE);
    cache &&
      this.setState({
        currentCountryCodeItem: cache ? JSON.parse(cache) : null,
      });
  };

  updateCountryCode = (countryCode: CountryCodeItem) => {
    this.setState({
      currentCountryCodeItem: countryCode,
    });
  };

  getEntryName = (): string => PortkeyEntries.SIGN_UP_ENTRY;

  render() {
    return (
      <>
        <BaseContainerContext.Provider value={{ entryName: this.getEntryName() }}>
          <SignupPortkey
            selectedCountryCode={this.state.currentCountryCodeItem}
            updateCountryCode={this.updateCountryCode}
          />
        </BaseContainerContext.Provider>
      </>
    );
  }
}

export interface SignUpPageState {
  currentCountryCodeItem: CountryCodeItem | null;
}

export interface SignUpPageResult {}
