import { DEFAULT_TOKEN } from '@portkey-wallet/constants/constants-ca/wallet';
import { NetworkType } from '@portkey-wallet/types';
import useEffectOnce from 'hooks/useEffectOnce';
import { Token, getCachedNetworkConfig } from 'model/chain';
import { getCurrentNetworkType } from 'model/hooks/network';
import { NetworkController } from 'network/controller';
import { useState } from 'react';

export function useSymbolImages() {
  const [symbolImages, setSymbolImages] = useState<Record<string, string>>({});
  NetworkController.getSymbolImage().then(result => {
    setSymbolImages(result.result?.symbolImages || {});
  });
  return symbolImages;
}

export function useCommonInfo() {
  const symbolImages = useSymbolImages();
  const [currentNetwork, setCurrentNetwork] = useState<NetworkType>('MAIN');
  const [defaultToken, setDefaultToken] = useState<Token>(DEFAULT_TOKEN);
  useEffectOnce(async () => {
    const n = await getCurrentNetworkType();
    setCurrentNetwork(n);
    const { defaultToken: cachedDefaultToken } = await getCachedNetworkConfig();
    setDefaultToken(cachedDefaultToken);
    console.log('cachedDefaultToken', cachedDefaultToken);
  });
  return {
    symbolImages,
    currentNetwork,
    defaultToken,
  };
}
export interface CommonInfo {
  symbolImages: Record<string, string>;
  currentNetwork: NetworkType;
  defaultToken: Token;
}
