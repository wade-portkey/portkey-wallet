import { createAction } from '@reduxjs/toolkit';
import type { ChainItemType } from '@portkey/rn-sdk/src/packages/types/chain';
import type { AddressBookItem } from '@portkey/rn-sdk/src/packages/types/addressBook';
import type { UpdateType } from '@portkey/rn-sdk/src/packages/types';

export const addressBookUpdate = createAction<{
  addressBook: AddressBookItem;
  type: UpdateType;
  currentChain: ChainItemType;
}>('addressBook/updateCurrentChainAddressBook');

export const resetAddressBook = createAction('addressBook/resetAddressBook');
