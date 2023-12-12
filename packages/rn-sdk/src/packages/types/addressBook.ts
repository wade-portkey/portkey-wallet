import { RpcUrlNetworkName } from 'packages/types';
export interface AddressBookItem {
  name: string;
  address: string;
  key?: string;
}

export type AddressBookType = Record<RpcUrlNetworkName, AddressBookItem[]>;
