import { ChainType, NetworkType } from '@portkey/rn-sdk/src/packages/types';
import useEffectOnce from '@portkey/rn-sdk/src/hooks/useEffectOnce';
import { getCurrentNetworkType } from '@portkey/rn-sdk/src/model/hooks/network';
import { useState } from 'react';

export function useDefaultChainType() {
  return 'aelf' as ChainType;
}
export function useCurrentNetworkInfo() {
  const [currentNetwork, setCurrentNetwork] = useState<NetworkType>('MAIN');
  useEffectOnce(async () => {
    setCurrentNetwork(await getCurrentNetworkType());
  });
  return currentNetwork;
}
