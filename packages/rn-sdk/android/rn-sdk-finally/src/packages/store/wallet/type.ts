import { ChainType } from '@portkey/rn-sdk/src/packages/types';
import type { AccountType, WalletInfoType } from '@portkey/rn-sdk/src/packages/types/wallet';
import {
  AccountNameErrorMessage,
  PasswordErrorMessage,
  WalletNameErrorMessage,
} from '@portkey/rn-sdk/src/packages/utils/wallet/types';

export type WalletType = ChainType;

export enum BaseWalletError {
  noCreateWallet = 'Please Create an Wallet First!',
  passwordFailed = 'Password Verification Failed!',
  accountExists = 'Account Already Exists!',
  accountNotExist = 'Account does not Exist!',
  accountCreateFailed = 'Account Create Failed!',
  createdAccountNotDeleted = 'Created Accounts cannot be Deleted',
  decryptionFailed = 'Decryption Failed!',
  invalidPrivateKey = 'Invalid Private Key',
}
export const WalletError = Object.assign(
  {},
  BaseWalletError,
  WalletNameErrorMessage,
  PasswordErrorMessage,
  AccountNameErrorMessage,
);

export interface WalletState {
  walletType: WalletType;
  walletInfo?: WalletInfoType;
  accountList?: AccountType[];
  currentAccount?: AccountType | undefined;
  nextBIP44Path: string;
}
