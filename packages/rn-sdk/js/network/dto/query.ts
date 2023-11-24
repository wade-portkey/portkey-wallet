import { ChainId } from '@portkey-wallet/types';

export interface SearchTokenListParams {
  keyword?: string; // used to filter token list, can be empty
  chainIdArray?: string[]; // if not provided, it's ['AELF', 'tDVV','tDVW']
}

export interface FetchBalanceConfig {
  skipCount?: number;
  maxResultCount?: number;
  caAddressInfos: Array<CaAddressInfoType>;
}

export type FetchBalanceResult = {
  data: ITokenItemResponse[];
  totalRecordCount: number;
};

export type ITokenItemResponse = {
  decimals: number;
  symbol: string;
  tokenContractAddress: string;
  balance: string;
  chainId: string;
  balanceInUsd: string;
  imageUrl: string;
  price: number;
};

export type CaAddressInfoType = { chainId: string; caAddress: string };

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
};
