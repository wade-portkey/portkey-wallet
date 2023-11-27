import { NetworkType } from '@portkey-wallet/types';
import { PortkeyConfig, EndPoints } from 'global/constants';
import useEffectOnce from 'hooks/useEffectOnce';
import { useState } from 'react';

export const getCurrentNetworkType = async (): Promise<NetworkType> => {
  return (await PortkeyConfig.endPointUrl()) === EndPoints.MAIN_NET ? 'MAIN' : 'TESTNET';
};

export const useCurrentNetworkType = () => {
  const [currentNetwork, setCurrentNetwork] = useState<NetworkType>('MAIN');
  useEffectOnce(async () => {
    setCurrentNetwork(await getCurrentNetworkType());
  });
  return currentNetwork;
};
