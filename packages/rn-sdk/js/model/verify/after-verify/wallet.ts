import { GlobalStorage, TempStorage } from 'service/storage';
import { USE_BIOMETRIC_KEY, WALLET_CONFIG_KEY, PIN_KEY } from '.';
import { WalletInfo } from 'network/dto/wallet';

export const rememberUseBiometric = async (useBiometric: boolean): Promise<void> => {
  GlobalStorage.set(USE_BIOMETRIC_KEY, useBiometric);
};

export const getUseBiometric = async (): Promise<boolean> => {
  return (await GlobalStorage.getBoolean(USE_BIOMETRIC_KEY)) ?? false;
};

export const isWalletUnlocked = async (): Promise<boolean> => {
  const tempWalletConfig = await TempStorage.getString(WALLET_CONFIG_KEY);
  return !!tempWalletConfig;
};

export const lockWallet = async (): Promise<void> => {
  TempStorage.remove(WALLET_CONFIG_KEY);
};

export const exitWallet = async (): Promise<void> => {
  GlobalStorage.remove(PIN_KEY);
  GlobalStorage.remove(USE_BIOMETRIC_KEY);
  GlobalStorage.remove(WALLET_CONFIG_KEY);
  TempStorage.remove(WALLET_CONFIG_KEY);
};

export const getTempWalletConfig = async (): Promise<RecoverWalletConfig> => {
  const tempWalletConfig = await TempStorage.getString(WALLET_CONFIG_KEY);
  if (!tempWalletConfig) throw new Error('wallet not unlocked');
  return JSON.parse(tempWalletConfig);
};

export const isWalletExists = async (): Promise<boolean> => {
  const storagePin = await GlobalStorage.getString(PIN_KEY);
  const walletConfig = await GlobalStorage.getString(WALLET_CONFIG_KEY);
  return !!storagePin && !!walletConfig;
};

export const checkPin = async (pinValue: string): Promise<boolean> => {
  const storagePin = await GlobalStorage.getString(PIN_KEY);
  return storagePin === pinValue;
};
export const changePin = async (pinValue: string): Promise<void> => {
  GlobalStorage.set(PIN_KEY, pinValue);
};

export const unLockTempWallet = async (pinValue?: string, useBiometric = false): Promise<boolean> => {
  const storagePin = await GlobalStorage.getString(PIN_KEY);
  const walletConfig = await GlobalStorage.getString(WALLET_CONFIG_KEY);
  if ((storagePin !== pinValue && !useBiometric) || !walletConfig) {
    return false;
  }
  if (await isWalletUnlocked()) {
    return true;
  } else {
    // TODO decrypt walletConfig
    TempStorage.set(WALLET_CONFIG_KEY, walletConfig);
    return true;
  }
};

export type RecoverWalletConfig = {
  sessionId?: string;
  fromRecovery?: boolean;
  accountIdentifier?: string;
  originalChainId?: string;
  caInfo?: {
    caHash: string;
    caAddress: string;
  };
} & WalletInfo;
