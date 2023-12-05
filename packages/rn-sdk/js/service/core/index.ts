import { myContainer } from './inversify.config';
import { IPortkeyAccountService, IPortkeyUIManagerService } from './base';
import { TYPES, WalletState } from './types';
import { UnlockedWallet } from 'model/wallet';
import { CallCaMethodProps } from 'service/JsModules/SubModules/WalletModule';
import { BaseMethodResult } from 'service/JsModules/types';
export * from './types';

class Portkey implements IPortkeyAccountService, IPortkeyUIManagerService {
  private _portkeyAccountService: IPortkeyAccountService;
  private _portkeyUIManagerService: IPortkeyUIManagerService;
  constructor() {
    this._portkeyAccountService = myContainer.get<IPortkeyAccountService>(TYPES.AccountModule);
    this._portkeyUIManagerService = myContainer.get<IPortkeyUIManagerService>(TYPES.UIManagerModule);
  }
  login(): Promise<UnlockedWallet | undefined> {
    return this._portkeyUIManagerService.login();
  }
  async openAssetsDashboard(): Promise<void> {
    this._portkeyUIManagerService.openAssetsDashboard();
  }
  async guardiansManager(): Promise<void> {
    this._portkeyUIManagerService.guardiansManager();
  }
  async settingsManager(): Promise<void> {
    this._portkeyUIManagerService.settingsManager();
  }
  async paymentSecurityManager(): Promise<void> {
    this._portkeyUIManagerService.paymentSecurityManager();
  }
  unlockWallet(): Promise<UnlockedWallet | undefined> {
    return this._portkeyUIManagerService.unlockWallet();
  }
  callCaContractMethod(props: CallCaMethodProps): Promise<BaseMethodResult> {
    return this._portkeyAccountService.callCaContractMethod(props);
  }
  async getWalletInfo(): Promise<UnlockedWallet> {
    return this._portkeyAccountService.getWalletInfo();
  }
  async getWalletState(): Promise<WalletState> {
    return this._portkeyAccountService.getWalletState();
  }
  async lockWallet(): Promise<boolean> {
    return this._portkeyAccountService.lockWallet();
  }
  async exitWallet(): Promise<boolean> {
    return this._portkeyAccountService.exitWallet();
  }
}
const portkey = new Portkey();
export { portkey };
