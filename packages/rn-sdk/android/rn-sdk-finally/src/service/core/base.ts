import { UnlockedWallet } from '@portkey/rn-sdk/src/model/wallet';
import { CallCaMethodProps } from '@portkey/rn-sdk/src/service/JsModules/SubModules/WalletModule';
import { BaseMethodResult } from '@portkey/rn-sdk/src/service/JsModules/types';
import { WalletState } from '@portkey/rn-sdk/src/service/core/types';

export interface IPortkeyAccountService {
  callCaContractMethod(props: CallCaMethodProps): Promise<BaseMethodResult>;
  getWalletInfo(): Promise<UnlockedWallet>;
  getWalletState(): Promise<WalletState>;
  lockWallet(): Promise<boolean>;
  exitWallet(): Promise<boolean>;
}

export interface IPortkeyUIManagerService {
  login(): Promise<UnlockedWallet | null>;
  openAssetsDashboard(): Promise<void>;
  guardiansManager(): Promise<void>;
  settingsManager(): Promise<void>;
  paymentSecurityManager(): Promise<void>;
  unlockWallet(): Promise<UnlockedWallet | null>;
}
