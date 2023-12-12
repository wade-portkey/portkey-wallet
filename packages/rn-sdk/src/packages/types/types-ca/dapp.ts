import { CACommonState } from 'packages/types/types-ca/store';
import { Accounts, ChainIds, ChainsInfo, WalletName } from '@portkey/provider-types';
import { DappStoreItem } from 'packages/types/store-ca/dapp/type';
import { ChainId, NetworkType } from 'packages/types';
import { ChainItemType } from 'packages/types/store-ca/wallet/type';
import { CAInfo } from 'packages/types/types-ca/wallet';
import { SessionInfo } from 'packages/types/session';
export interface IDappManager<T = CACommonState> {
  getState(): Promise<T>;
  isLogged(): Promise<boolean>;
  originIsAuthorized(origin: string): Promise<boolean>;
  isActive(origin: string): Promise<boolean>;
  accounts(origin: string): Promise<Accounts>;
  chainId(): Promise<ChainIds>;
  chainIds(): Promise<ChainIds>;
  chainsInfo(): Promise<ChainsInfo>;
  getChainInfo(chainId: ChainId): Promise<ChainItemType | undefined>;
  addDapp(dapp: DappStoreItem): Promise<void>;
  updateDapp(dapp: DappStoreItem): Promise<void>;
  isLocked(): Promise<boolean>;
  getRpcUrl(chainId: ChainId): Promise<string | undefined>;
  getCaInfo(chainId: ChainId): Promise<CAInfo | undefined>;
  networkType(): Promise<NetworkType>;
  walletName(): Promise<WalletName>;
  getSessionInfo(origin: string): Promise<SessionInfo | undefined>;
  getRememberMeBlackList(): Promise<string[] | undefined>;
}
export interface IDappManagerStore<T = CACommonState> {
  getState(): Promise<T>;
  dispatch: any;
}

export type DappManagerOptions<T = IDappManagerStore> = {
  store: T;
};
