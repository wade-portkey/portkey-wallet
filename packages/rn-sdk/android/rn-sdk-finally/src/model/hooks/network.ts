import { BackEndNetWorkMap } from '@portkey/rn-sdk/src/packages/constants/constants-ca/backend-network';
import { NetworkType } from '@portkey/rn-sdk/src/packages/types';
import { PortkeyConfig } from '@portkey/rn-sdk/src/global/constants';
import useEffectOnce from '@portkey/rn-sdk/src/hooks/useEffectOnce';
import { useState } from 'react';

export const getCurrentNetworkType = async (): Promise<NetworkType> => {
  const endPointUrl = await PortkeyConfig.endPointUrl();
  switch (endPointUrl) {
    case BackEndNetWorkMap['back-end-test1'].apiUrl: {
      return 'TEST1';
    }

    case BackEndNetWorkMap['back-end-mainnet'].apiUrl: {
      return 'MAIN';
    }

    case BackEndNetWorkMap['back-end-testnet'].apiUrl:
    default: {
      return 'TESTNET';
    }
  }
};

export const useCurrentNetworkType = () => {
  const [currentNetwork, setCurrentNetwork] = useState<NetworkType>('MAIN');
  useEffectOnce(async () => {
    setCurrentNetwork(await getCurrentNetworkType());
  });
  return currentNetwork;
};
