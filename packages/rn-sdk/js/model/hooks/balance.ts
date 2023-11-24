import { ZERO } from '@portkey-wallet/constants/misc';
import { divDecimals } from '@portkey-wallet/utils/converter';
import useEffectOnce from 'hooks/useEffectOnce';
import { getUnlockedWallet } from 'model/wallet';
import { NetworkController } from 'network/controller';
import { ITokenItemResponse, IUserTokenItem } from 'network/dto/query';
import { useMemo, useState } from 'react';

export const useWalletBalanceUSD = () => {
  const { tokenPrices } = useTokenPrices();
  const { balanceList } = useAccountTokenBalanceList();
  const balanceUSD = useMemo(() => {
    return balanceList.reduce((acc, item) => {
      const { symbol, balance, decimals } = item;
      const price = tokenPrices.find(token => token.symbol === symbol)?.priceInUsd || 0;
      return acc.plus(divDecimals(balance, decimals).times(price));
    }, ZERO);
  }, [balanceList, tokenPrices]);
  return {
    balanceUSD,
  };
};

export const useTokenPrices = () => {
  const [tokenPrices, setTokenPrices] = useState<Array<{ symbol: string; priceInUsd: number }>>([]);
  useEffectOnce(async () => {
    const result = await NetworkController.checkELFTokenPrice();
    result && setTokenPrices(result.items);
  });
  return {
    tokenPrices,
  };
};

export const useAccountTokenBalanceList = () => {
  const [balanceList, setBalanceList] = useState<Array<ITokenItemResponse>>([]);
  useEffectOnce(async () => {
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
  });
  return {
    balanceList,
  };
};

export const useSearchTokenList = () => {
  const [tokenList, setTokenList] = useState<IUserTokenItem[]>([]);
  useEffectOnce(async () => {
    const result = await NetworkController.searchTokenList();
    result && setTokenList(result.items);
  });
  return {
    tokenList,
  };
};
