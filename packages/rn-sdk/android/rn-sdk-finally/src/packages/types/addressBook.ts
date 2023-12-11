import { RpcUrlNetworkName } from '@portkey/rn-sdk/src/packages/types';
export interface AddressBookItem {
  name: string;
  address: string;
  key?: string;
}

export type AddressBookType = Record<RpcUrlNetworkName, AddressBookItem[]>;
