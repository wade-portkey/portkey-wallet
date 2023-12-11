import { ChainId } from '@portkey/rn-sdk/src/packages/types';
import { OperationTypeEnum } from '@portkey/rn-sdk/src/packages/types/verifier';

export type VerifyTokenParams = {
  accessToken?: string;
  verifierId?: string;
  chainId: ChainId;
  id: string;
  operationType: OperationTypeEnum;
};
