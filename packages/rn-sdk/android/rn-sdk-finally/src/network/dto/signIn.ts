import { GuardiansInfo } from '@portkey/rn-sdk/src/packages/types/types-ca/guardian';
import { CAInfo } from '@portkey/rn-sdk/src/packages/types/types-ca/wallet';

export interface RegisterStatusDTO {
  originChainId: string;
}

export type AccountIdentifierStatusDTO = GuardiansInfo & Pick<CAInfo, 'caAddress' | 'caHash'>;
