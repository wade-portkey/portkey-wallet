import { PortkeyConfig } from 'global/constants';
import { isWalletUnlocked } from 'model/verify/after-verify';
import { getUnlockedWallet } from 'model/wallet';
import { NetworkController } from 'network/controller';
import { AElfWeb3SDK } from 'network/dto/wallet';
import { TempStorage } from 'service/storage';

const NETWORK_TOKEN_IDENTIFIER = 'network-token-identifier';
const EXPIRE_TIME_IDENTIFIER = 'expire-time-identifier';

export let networkTokenSwitch = false;

export const getCachedNetworkToken = async (): Promise<string> => {
  networkTokenSwitch = true;
  if (!(await isWalletUnlocked())) throw new Error('wallet is locked');
  const chainId = await PortkeyConfig.currChainId();
  const cached = await TempStorage.getString(`${NETWORK_TOKEN_IDENTIFIER}-${chainId}`);
  const expireTime = await TempStorage.getString(`${EXPIRE_TIME_IDENTIFIER}-${chainId}`);
  if (cached && expireTime && parseInt(expireTime, 10) < Date.now()) return cached;
  const {
    address,
    privateKey,
    caInfo: { caHash },
  } = await getUnlockedWallet();
  const wallet = AElfWeb3SDK.getWalletByPrivateKey(privateKey);
  const timestamp = Date.now();
  const message = Buffer.from(`${address}-${timestamp}`).toString('hex');
  const signature = AElfWeb3SDK.sign(message, wallet.keyPair).toString('hex');
  const { access_token, expires_in } = await NetworkController.refreshNetworkToken({
    pubkey: wallet.keyPair.getPublic('hex'),
    timestamp: `${timestamp}`,
    ca_hash: caHash,
    chain_id: chainId,
    signature,
  });
  TempStorage.set(`${NETWORK_TOKEN_IDENTIFIER}-${chainId}`, access_token);
  TempStorage.set(`${EXPIRE_TIME_IDENTIFIER}-${chainId}`, `${Date.now() + expires_in * 1000}`);
  networkTokenSwitch = false;
  return access_token;
};
