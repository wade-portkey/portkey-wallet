import { DEFAULT_TOKEN } from '@portkey/rn-sdk/src/packages/constants/constants-ca/wallet';
import { NetworkType } from '@portkey/rn-sdk/src/packages/types';
import useEffectOnce from '@portkey/rn-sdk/src/hooks/useEffectOnce';
import { Token, getCachedNetworkConfig } from '@portkey/rn-sdk/src/model/chain';
import { getCurrentNetworkType } from '@portkey/rn-sdk/src/model/hooks/network';
import { getTempWalletConfig } from '@portkey/rn-sdk/src/model/verify/core';
import { NetworkController } from '@portkey/rn-sdk/src/network/controller';
import { useState } from 'react';

export function useSymbolImages() {
  const [symbolImages, setSymbolImages] = useState<Record<string, string>>({});
  useEffectOnce(() => {
    NetworkController.getSymbolImage().then(result => {
      setSymbolImages(result.result?.symbolImages || {});
    });
  });
  return symbolImages;
}

export function useCommonNetworkInfo() {
  const symbolImages = useSymbolImages();
  const [currentNetwork, setCurrentNetwork] = useState<NetworkType>('MAIN');
  const [defaultToken, setDefaultToken] = useState<Token>(DEFAULT_TOKEN);
  const [currentCaAddress, setCurrentCaAddress] = useState<string>();
  useEffectOnce(async () => {
    const n = await getCurrentNetworkType();
    setCurrentNetwork(n);
    const { defaultToken: cachedDefaultToken } = await getCachedNetworkConfig();
    setDefaultToken(cachedDefaultToken);
    const wallet = await getTempWalletConfig();
    setCurrentCaAddress(wallet.caInfo?.caAddress ?? '');
  });
  return {
    symbolImages,
    currentNetwork,
    defaultToken,
    currentCaAddress,
  };
}
export interface CommonInfo {
  symbolImages: Record<string, string>;
  currentNetwork: NetworkType;
  defaultToken: Token;
}
