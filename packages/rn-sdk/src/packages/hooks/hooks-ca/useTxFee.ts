import { useAppCASelector } from 'packages/hooks/hooks-ca';
import { useEffect, useMemo } from 'react';
import { useAppCommonDispatch } from 'packages/hooks';
import { useCurrentNetwork } from 'packages/hooks/hooks-ca/network';
import { fetchTxFeeAsync } from 'packages/types/store-ca/txFee/actions';
import { ChainId } from 'packages/types';
import { InitialTxFee } from 'packages/constants/constants-ca/wallet';
import { useCurrentChainList } from 'packages/hooks/hooks-ca/chainList';

export const useFetchTxFee = () => {
  const dispatch = useAppCommonDispatch();
  const chainList = useCurrentChainList();
  const chainIds = useMemo(() => chainList?.map(chain => chain.chainId), [chainList]);

  useEffect(() => {
    if (chainIds?.length) {
      dispatch(fetchTxFeeAsync(chainIds));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainIds]);
};

export const useGetTxFee = (chainId: ChainId) => {
  const txFee = useAppCASelector(state => state.txFee);
  const currentNetwork = useCurrentNetwork();
  const targetTxFee = useMemo(() => txFee[currentNetwork]?.[chainId], [chainId, currentNetwork, txFee]);

  return useMemo(() => targetTxFee ?? InitialTxFee, [targetTxFee]);
};
