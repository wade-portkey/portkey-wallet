import { PortkeyConfig } from 'global/constants';
import { NetworkController } from 'network/controller';
import { TempStorage } from 'service/storage';

const NETWORK_CONFIG_KEY = 'network_config_key';

export const getCachedNetworkConfig = async (
  targetChainId?: string,
): Promise<{ peerUrl: string; caContractAddress: string }> => {
  const cachedConfig = await TempStorage.getString(NETWORK_CONFIG_KEY);
  if (cachedConfig) return JSON.parse(cachedConfig);
  const chain = targetChainId || (await PortkeyConfig.currChainId());
  const chainInfo = (await NetworkController.getNetworkInfo())?.items?.find(async it => it.chainId === chain);
  if (!chainInfo) throw new Error('network failure');
  const config = {
    peerUrl: chainInfo.endPoint,
    caContractAddress: chainInfo.caContractAddress,
  };
  TempStorage.set(NETWORK_CONFIG_KEY, config);
  return config;
};
