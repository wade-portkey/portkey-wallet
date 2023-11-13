import { getCaInfoByAccountIdentifierOrSessionId } from 'model/global';
import { getTempWalletConfig } from 'model/verify/after-verify';
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
  const caInfo =
    originalCaInfo ??
    (await getCaInfoByAccountIdentifierOrSessionId(originalChainId, accountIdentifier, fromRecovery, sessionId));
  return {
    caInfo,
    originChainId: originalChainId,
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
