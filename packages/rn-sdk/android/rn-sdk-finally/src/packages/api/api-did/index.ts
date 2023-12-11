import walletApi from '@portkey/rn-sdk/src/packages/api/api-did/wallet';
import verificationApi from '@portkey/rn-sdk/src/packages/api/api-did/verification';
import contactApi from '@portkey/rn-sdk/src/packages/api/api-did/contact';
import chainApi from '@portkey/rn-sdk/src/packages/api/api-did/chain';
import assetsApi from '@portkey/rn-sdk/src/packages/api/api-did/assets';
import recentApi from '@portkey/rn-sdk/src/packages/api/api-did/recent';
import tokenApi from '@portkey/rn-sdk/src/packages/api/api-did/token';
import paymentApi from '@portkey/rn-sdk/src/packages/api/api-did/payment';
import deviceApi from '@portkey/rn-sdk/src/packages/api/api-did/device';
import messageApi from '@portkey/rn-sdk/src/packages/api/api-did/message';
import switchApi from '@portkey/rn-sdk/src/packages/api/api-did/switch';
import discoverApi from '@portkey/rn-sdk/src/packages/api/api-did/discover';
import txFeeApi from '@portkey/rn-sdk/src/packages/api/api-did/txFee';
import imApi from '@portkey/rn-sdk/src/packages/api/api-did/im';

import esApi from '@portkey/rn-sdk/src/packages/api/api-did/es';
import myServer, { DidService } from '@portkey/rn-sdk/src/packages/api/api-did/server';
import { API_REQ_FUNCTION } from '@portkey/rn-sdk/src/packages/api/types';
import { ES_API_REQ_FUNCTION } from '@portkey/rn-sdk/src/packages/api/api-did/es/type';
import activityApi from '@portkey/rn-sdk/src/packages/api/api-did/activity';

export const DEFAULT_METHOD = 'POST';

/**
 * api request configuration directory
 * @example
 *    upload: {
 *      target: '/api/file-management/file-descriptor/upload',
 *      baseConfig: { method: 'POST', },
 *    },
 * or:
 *    upload:'/api/file-management/file-descriptor/upload'
 *
 * @description api configuration default method is from DEFAULT_METHOD
 * @type {UrlObj}  // The type of this object from UrlObj.
 */

export const BASE_APIS = {};

export const EXPAND_APIS = {
  wallet: walletApi,
  verify: verificationApi,
  contact: contactApi,
  chain: chainApi,
  // token: tokenApi,
  activity: activityApi,
  assets: assetsApi,
  recent: recentApi,
  token: tokenApi,
  payment: paymentApi,
  device: deviceApi,
  message: messageApi,
  switch: switchApi,
  discover: discoverApi,
  txFee: txFeeApi,
  im: imApi,
};

export type BASE_REQ_TYPES = {
  [x in keyof typeof BASE_APIS]: API_REQ_FUNCTION;
};

export type EXPAND_REQ_TYPES = {
  [X in keyof typeof EXPAND_APIS]: {
    [K in keyof typeof EXPAND_APIS[X]]: API_REQ_FUNCTION;
  };
};

export type ES_REQ_TYPES = Record<keyof typeof esApi, ES_API_REQ_FUNCTION>;

myServer.parseRouter('es', esApi as any);

myServer.parseRouter('base', BASE_APIS);

Object.entries(EXPAND_APIS).forEach(([key, value]) => {
  myServer.parseRouter(key, value as any);
});

export interface IRequest extends BASE_REQ_TYPES, EXPAND_REQ_TYPES {
  es: ES_REQ_TYPES;
}

const request = myServer as unknown as IRequest & DidService;

export { request };
