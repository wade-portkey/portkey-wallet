import type { ChainType, NetworkType, UpdateType } from 'packages/types';
import { BaseToken as EOABaseToken } from 'packages/types/types-eoa/token';
import { BaseToken as CABaseToken } from 'packages/types/types-ca/token';

export type BasicContracts = {
  tokenContract: string;
};

export interface BaseChainType {
  chainId: string | number; // ELF: string; ethereum: number;
  netWorkType?: NetworkType; // Optional differentiated mainnet testnet
  chainType: ChainType;
  rpcUrl: string;
  blockExplorerURL?: string;
  // ethereum
  nativeCurrency: EOABaseToken | CABaseToken | undefined;
  // contract set
  basicContracts?: BasicContracts;
}

export interface IChainType extends BaseChainType {
  key?: string; // `${rpcUrl}&${networkName}`;
  networkName: string;
  id?: number;
  iconUrl?: string;
}

export interface ChainItemType extends IChainType {
  isCustom?: boolean;
  isCommon: boolean | undefined;
  isFixed?: boolean;
}

export type UpdateChainListType = { chain: ChainItemType; type: UpdateType };

export type ChainChangeHandler = (v: ChainItemType) => void;
