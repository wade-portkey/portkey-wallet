import { ChainId, ChainType, NetworkType } from 'packages/types';
import { DeviceType, QRExtraDataType } from 'packages/types/types-ca/device';
import { IToSendAssetParamsType } from 'packages/types/types-ca/routeParams';

export interface QRData {
  type: 'login' | 'send';
  netWorkType: NetworkType;
  chainType: ChainType; // eth or nft
  address: string;
}

export interface LoginQRData extends QRData {
  type: 'login';
  extraData?: QRExtraDataType;
  deviceType?: DeviceType; // 0.0.1
  id?: number | string;
}

export interface SendTokenQRDataType extends QRData {
  type: 'send';
  sendType: 'nft' | 'token';
  toInfo: {
    address: string;
    name: string;
    chainId?: ChainId;
    chainType?: ChainType;
  };
  assetInfo: IToSendAssetParamsType;
}

export const isLoginQRData = (data: QRData): data is LoginQRData => {
  return data.type === 'login';
};
