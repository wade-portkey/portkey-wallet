import { ChainId, NetworkType } from '@portkey/rn-sdk/src/packages/types';

export type TxFeeItem = {
  [key in ChainId]?: {
    ach: number;
    crossChain: number;
    max: number;
  };
};

export type TxFeeType = {
  [key in NetworkType]?: TxFeeItem;
};
