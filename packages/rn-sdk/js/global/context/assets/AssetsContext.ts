import { ITokenItemResponse, IUserTokenItem } from 'network/dto/query';
import BigNumber from 'bignumber.js';
import { createContext } from 'react';

export interface AssetsContextType {
  balanceList: Array<ITokenItemResponse>;
  updateBalanceList: () => Promise<void>;
  tokenPrices: Array<{ symbol: string; priceInUsd: number }>;
  updateTokenPrices: () => Promise<void>;
  allOfTokensList: Array<IUserTokenItem>;
  updateTokensList: () => Promise<void>;
  balanceUSD: BigNumber;
}

const AssetsContext = createContext<AssetsContextType>({
  balanceList: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateBalanceList: async () => {},
  tokenPrices: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateTokenPrices: async () => {},
  allOfTokensList: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateTokensList: async () => {},
  balanceUSD: new BigNumber(0),
});

export default AssetsContext;
