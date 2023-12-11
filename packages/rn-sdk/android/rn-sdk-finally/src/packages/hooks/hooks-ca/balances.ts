import { useCurrentNetwork } from '@portkey/rn-sdk/src/packages/hooks/network';
import { useMemo } from 'react';
import { useAppCASelector } from '@portkey/rn-sdk/src/packages/hooks/hooks-ca';
import { divDecimals, formatAmountShow } from '@portkey/rn-sdk/src/packages/utils/converter';
import { ZERO } from '@portkey/rn-sdk/src/packages/constants/misc';

export function useAllBalances() {
  return useAppCASelector(state => state.tokenBalance.balances);
}

export function useCurrentNetworkBalances() {
  const balances = useAllBalances();
  const currentNetwork = useCurrentNetwork();
  return useMemo(() => {
    if (!currentNetwork.rpcUrl) return;
    return balances?.[currentNetwork.rpcUrl];
  }, [balances, currentNetwork.rpcUrl]);
}

export const useAccountBalanceUSD = () => {
  const {
    accountToken: { accountTokenList },
    tokenPrices: { tokenPriceObject },
  } = useAppCASelector(state => state.assets);

  const accountBalanceUSD = useMemo(() => {
    const result = accountTokenList.reduce((acc, item) => {
      const { symbol, balance, decimals } = item;
      const price = tokenPriceObject[symbol];
      return acc.plus(divDecimals(balance, decimals).times(price));
    }, ZERO);

    return formatAmountShow(result, 2);
  }, [accountTokenList, tokenPriceObject]);

  return accountBalanceUSD;
};
