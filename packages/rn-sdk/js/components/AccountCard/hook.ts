import { ChainType, NetworkType } from '@portkey-wallet/types';
import useEffectOnce from 'hooks/useEffectOnce';
import { useState } from 'react';
import { getCurrentNetwork } from 'utils/commonUtil';

export function useDefaultChainType() {
  return 'aelf' as ChainType;
}
export function useCurrentNetworkInfo() {
  const [currentNetwork, setCurrentNetwork] = useState<NetworkType>('MAIN');
  useEffectOnce(async () => {
    setCurrentNetwork(await getCurrentNetwork());
  });
  return currentNetwork;
}
