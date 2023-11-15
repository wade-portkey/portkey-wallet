import { PortkeyConfig } from 'global/constants';
import { NetworkController } from 'network/controller';
import { TempStorage } from 'service/storage';

const NETWORK_CONFIG_KEY = 'network_config_key';

export const getCachedNetworkConfig = async (
  targetChainId?: string,
): Promise<{ peerUrl: string; caContractAddress: string }> => {
  const peerUrl = await PortkeyConfig.endPointUrl();
  const chain = targetChainId || (await PortkeyConfig.currChainId());
  const cachedConfig = await TempStorage.getString(`${NETWORK_CONFIG_KEY}#${peerUrl}#${chain}`);
  if (cachedConfig) return JSON.parse(cachedConfig);
  const networkInfo = await NetworkController.getNetworkInfo();
  const chainInfo = networkInfo.items.find(it => it.chainId === chain);
  if (!chainInfo) throw new Error('network failure');
  const config = {
    peerUrl: chainInfo.endPoint,
    caContractAddress: chainInfo.caContractAddress,
  };
  TempStorage.set(`${NETWORK_CONFIG_KEY}#${peerUrl}#${chain}`, JSON.stringify(config));
  return config;
};
