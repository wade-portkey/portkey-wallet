import { PortkeyConfig, setCurrChainId } from 'global/constants';
import { getCaInfoByAccountIdentifierOrSessionId } from 'model/global';
import { getTempWalletConfig } from 'model/verify/after-verify';
import { NetworkController } from 'network/controller';
import { WalletInfo } from 'network/dto/wallet';

export const getUnlockedWallet = async (): Promise<UnlockedWallet> => {
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
  return {
    caInfo,
    originChainId: checkedOriginalChainId,
    privateKey,
    publicKey,
    address,
  };
};

export type UnlockedWallet = {
  caInfo: {
    caHash: string;
    caAddress: string;
  };
  originChainId: string;
} & WalletInfo;
