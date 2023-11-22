import { PortkeyConfig } from 'global/constants';
import { NetworkController } from 'network/controller';
import { AElfChainStatusItemDTO } from 'network/dto/wallet';
import { TempStorage } from 'service/storage';

const NETWORK_CONFIG_KEY = 'network_config_key';
export interface Token {
  address: string;
  decimals: string;
  imageUrl: string;
  name: string;
  symbol: string;
}
export const getCachedNetworkConfig = async (
  targetChainId?: string,
): Promise<{ peerUrl: string; caContractAddress: string; defaultToken: Token }> => {
  const portkeyEndPointUrl = await PortkeyConfig.endPointUrl();
  const chain = targetChainId || (await PortkeyConfig.currChainId());
  const cachedConfig = await TempStorage.getString(`${NETWORK_CONFIG_KEY}#${portkeyEndPointUrl}#${chain}`);
  console.log('cachedConfig', cachedConfig);
  if (cachedConfig) return JSON.parse(cachedConfig);
  const networkInfo = await NetworkController.getNetworkInfo();
  const chainInfo = networkInfo.items.find(it => it.chainId === chain);
  if (!chainInfo) throw new Error('network failure');
  const config = {
    peerUrl: chainInfo.endPoint,
    caContractAddress: chainInfo.caContractAddress,
    defaultToken: chainInfo.defaultToken,
  };
  TempStorage.set(`${NETWORK_CONFIG_KEY}#${portkeyEndPointUrl}#${chain}`, JSON.stringify(config));
  return config;
};
export const getCachedAllChainInfo = async (): Promise<Array<AElfChainStatusItemDTO>> => {
  const portkeyEndPointUrl = await PortkeyConfig.endPointUrl();
  const cachedConfig = await TempStorage.getString(`${NETWORK_CONFIG_KEY}#${portkeyEndPointUrl}`);
  if (cachedConfig) return JSON.parse(cachedConfig);
  const networkInfo = await NetworkController.getNetworkInfo();
  const chainInfo = networkInfo.items;
  if (!chainInfo) throw new Error('network failure');
  TempStorage.set(`${NETWORK_CONFIG_KEY}#${portkeyEndPointUrl}`, JSON.stringify(chainInfo));
  return chainInfo;
};
