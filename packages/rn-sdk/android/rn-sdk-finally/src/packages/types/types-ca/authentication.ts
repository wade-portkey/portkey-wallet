import { ChainId } from 'packages/types';
import { OperationTypeEnum } from 'packages/types/verifier';

export type VerifyTokenParams = {
  accessToken?: string;
  verifierId?: string;
  chainId: ChainId;
  id: string;
  operationType: OperationTypeEnum;
};
