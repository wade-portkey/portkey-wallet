import {
  CaHolderManagerDto,
  GetCaHolderManagerInfoDto,
  LoginGuardianDto,
} from 'packages/graphql/contract/__generated__/types';

//getCAHolderByManager
export type GetCAHolderByManagerParamsType = Pick<GetCaHolderManagerInfoDto, 'manager' | 'caHash' | 'chainId'>;

export type CaHolderWithGuardian = CaHolderManagerDto & {
  loginGuardianInfo: Array<LoginGuardianDto | null>;
};
