import { ChainId } from '@portkey-wallet/types';
import { NetworkController } from 'network/controller';

export enum EndPoints {
  MAIN_NET = 'https://did-portkey.portkey.finance',
  TEST_NET = 'https://did-portkey-test.portkey.finance',
  TEST1 = 'https://localtest-applesign.portkey.finance',
  TEST2 = 'https://localtest-applesign2.portkey.finance',
}

export interface PortkeyConfigInterface {
  endPointUrl: string;
  currChainId: ChainId;
}

export const PortkeyConfig: PortkeyConfigInterface = {
  endPointUrl: EndPoints.TEST2,
  currChainId: 'AELF',
};

export const setEndPointUrl = (environment: EndPoints) => {
  PortkeyConfig.endPointUrl = environment;
  NetworkController.updateEndPointUrl(environment);
};

export const setCurrChainId = (chainId: ChainId) => {
  PortkeyConfig.currChainId = chainId;
};
