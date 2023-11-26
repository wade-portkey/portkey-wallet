import { PortkeyConfig, setCurrChainId } from 'global/constants';
import useEffectOnce from 'hooks/useEffectOnce';
import { callGetHolderInfoMethod } from 'model/contract/handler';
import { getCaInfoByAccountIdentifierOrSessionId } from 'model/global';
import { getTempWalletConfig } from 'model/verify/after-verify';
import { NetworkController } from 'network/controller';
import { WalletInfo } from 'network/dto/wallet';
import { useState } from 'react';

export const getUnlockedWallet = async ({
  getMultiCaAddresses,
}: GetWalletConfig = DefaultConfig): Promise<UnlockedWallet> => {
  const {
    sessionId,
    accountIdentifier,
    fromRecovery,
    originalChainId = 'AELF',
    privateKey,
    publicKey,
    address,
    caInfo: originalCaInfo,
  } = (await getTempWalletConfig()) || {};
  let checkedOriginalChainId = originalChainId;
  if (accountIdentifier) {
    const chainInfo = await NetworkController.getRegisterResult(accountIdentifier);
    checkedOriginalChainId = chainInfo.result?.originChainId || originalChainId;
  }
  setCurrChainId(checkedOriginalChainId as any);
  PortkeyConfig;
  const caInfo =
    originalCaInfo ??
    (await getCaInfoByAccountIdentifierOrSessionId(originalChainId, accountIdentifier, fromRecovery, sessionId));
  if (!caInfo) throw new Error('caInfo is not exist');
  const multiCaAddresses: {
    [key: string]: string;
  } = {};
  multiCaAddresses[originalChainId] = caInfo.caAddress;
  if (getMultiCaAddresses) {
    const { caHash } = caInfo;
    const { items } = await NetworkController.getNetworkInfo();
    for (const item of items) {
      if (item.chainId === originalChainId) continue;
      const res = await callGetHolderInfoMethod(caHash, item.caContractAddress, item.endPoint);
      if (res?.error) {
        console.log('getMultiCaAddresses error', res?.error);
        continue;
      } else {
        console.log('getMultiCaAddresses success', res?.data);
      }
      multiCaAddresses[item.chainId] = res?.data?.caAddress;
    }
  }
  return {
    caInfo,
    originChainId: checkedOriginalChainId,
    privateKey,
    publicKey,
    address,
    multiCaAddresses,
    name: 'Wallet 01', // TODO will be changed later
  };
};

export const useUnlockedWallet = (config: GetWalletConfig = DefaultConfig) => {
  const [wallet, setWallet] = useState<UnlockedWallet>();
  useEffectOnce(async () => {
    const tempWallet = await getUnlockedWallet(config);
    setWallet(tempWallet);
  });
  return {
    wallet,
  };
};

export type GetWalletConfig = {
  getMultiCaAddresses?: boolean;
};

const DefaultConfig: GetWalletConfig = {
  getMultiCaAddresses: false,
};

export type UnlockedWallet = {
  caInfo: {
    caHash: string;
    caAddress: string;
  };
  multiCaAddresses: {
    [key: string]: string;
  };
  name: string;
  originChainId: string;
} & WalletInfo;
