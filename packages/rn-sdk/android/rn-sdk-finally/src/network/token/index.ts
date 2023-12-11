import { PortkeyConfig } from '@portkey/rn-sdk/src/global/constants';
import { isWalletUnlocked } from '@portkey/rn-sdk/src/model/verify/core';
import { getUnlockedWallet } from '@portkey/rn-sdk/src/model/wallet';
import { NetworkController } from '@portkey/rn-sdk/src/network/controller';
import { AElfWeb3SDK } from '@portkey/rn-sdk/src/network/dto/wallet';
import { TempStorage } from '@portkey/rn-sdk/src/service/storage';
import { handleCachedValue } from '@portkey/rn-sdk/src/service/storage/cache';

const NETWORK_TOKEN_IDENTIFIER = 'network-token-identifier';
const EXPIRE_TIME_IDENTIFIER = 'network-token-expire-time-identifier';

export const getCachedNetworkToken = async (): Promise<string> => {
  if (!(await isWalletUnlocked())) throw new Error('wallet is locked');
  return handleCachedValue({
    target: 'TEMP',
    getIdentifier: async () => {
      const chainId = await PortkeyConfig.currChainId();
      return `${NETWORK_TOKEN_IDENTIFIER}-${chainId}`;
    },
    valueExpireStrategy: async () => {
      const chainId = PortkeyConfig.currChainId();
      const expireTime = await TempStorage.getString(`${EXPIRE_TIME_IDENTIFIER}-${chainId}`);
      return expireTime ? parseInt(expireTime, 10) < Date.now() : false;
    },
    getValueIfNonExist: async () => {
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
        chain_id: await PortkeyConfig.currChainId(),
        signature,
      });
      TempStorage.set(
        `${EXPIRE_TIME_IDENTIFIER}-${await PortkeyConfig.currChainId()}`,
        `${Date.now() + expires_in * 1000}`,
      );
      return access_token;
    },
  });
};
