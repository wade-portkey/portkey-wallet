import { ChainId } from '@portkey-wallet/types';

export interface FetchUserTokenConfig {
  keyword: string;
  chainIdArray: string[];
}

export type GetUserTokenListResult = {
  items: IUserTokenItem[];
  totalRecordCount: number;
};

export type IUserTokenItem = {
  isDisplay: boolean;
  isDefault: boolean;
  id: string;
  token: {
    chainId: ChainId;
    decimals: number;
    address: string;
    symbol: string;
    id: string;
  };
};

export type FetchTokenPriceResult = {
  items: Array<{ symbol: string; priceInUsd: number }>;
  totalRecordCount: number;
};
