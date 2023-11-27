import useEffectOnce from 'hooks/useEffectOnce';
import { getUnlockedWallet } from 'model/wallet';
import { NetworkController } from 'network/controller';
import { ITokenItemResponse, IUserTokenItem } from 'network/dto/query';
import { useState } from 'react';

export const useTokenPrices = () => {
  const [tokenPrices, setTokenPrices] = useState<Array<{ symbol: string; priceInUsd: number }>>([]);
  useEffectOnce(async () => {
    await updateTokenPrices();
  });
  const updateTokenPrices = async () => {
    const result = await NetworkController.checkELFTokenPrice();
    result && setTokenPrices(result.items);
  };
  return {
    tokenPrices,
    updateTokenPrices,
  };
};

export const useAccountTokenBalanceList = () => {
  const [balanceList, setBalanceList] = useState<Array<ITokenItemResponse>>([]);
  useEffectOnce(async () => {
    await updateBalanceList();
  });
  const updateBalanceList = async () => {
    const { multiCaAddresses } = await getUnlockedWallet({ getMultiCaAddresses: true });
    const result = await NetworkController.fetchUserTokenBalance({
      maxResultCount: 100,
      skipCount: 0,
      caAddressInfos: Object.entries(multiCaAddresses).map(([chainId, caAddress]) => ({
        chainId,
        caAddress,
      })),
    });
    result && setBalanceList(result.data);
  };
  return {
    balanceList,
    updateBalanceList,
  };
};

export const useSearchTokenList = () => {
  const [tokenList, setTokenList] = useState<IUserTokenItem[]>([]);
  useEffectOnce(async () => {
    await updateTokensList();
  });
  const updateTokensList = async () => {
    const result = await NetworkController.searchTokenList();
    result && setTokenList(result.items);
  };
  return {
    tokenList,
    updateTokensList,
  };
};
