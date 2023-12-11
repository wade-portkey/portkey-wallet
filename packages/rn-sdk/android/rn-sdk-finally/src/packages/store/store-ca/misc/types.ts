import { NetworkType } from '@portkey/rn-sdk/src/packages/types';
import { CountryItem } from '@portkey/rn-sdk/src/packages/types/types-ca/country';
import { UpdateNotify, VersionDeviceType } from '@portkey/rn-sdk/src/packages/types/types-ca/device';

export interface UpdateVersionParams {
  deviceId?: string;
  deviceType: VersionDeviceType;
  appVersion: string;
  appId?: string;
}

export interface MiscState {
  versionInfo?: UpdateNotify;
  phoneCountryCodeListChainMap?: {
    [T in NetworkType]?: CountryItem[];
  };
  defaultPhoneCountryCode?: CountryItem;
  localPhoneCountryCode?: CountryItem;
}
