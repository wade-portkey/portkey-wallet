import { AccountOriginalType } from '@portkey/rn-sdk/src/model/verify/core';
import { GuardianConfig } from '@portkey/rn-sdk/src/model/verify/guardian';
import { CheckVerifyCodeResultDTO } from '@portkey/rn-sdk/src/network/dto/guardian';
import { ThirdPartyAccountInfo } from '@portkey/rn-sdk/src/model/verify/third-party-account';
import { ITransferLimitItem } from '@portkey/rn-sdk/src/model/security';

export interface GuardianVerifyConfig {
  guardianVerifyType: GuardianVerifyType;
  accountIdentifier?: string;
  accountOriginalType?: AccountOriginalType;
  guardians: Array<GuardianConfig>;
  particularGuardian?: GuardianConfig;
  thirdPartyAccountInfo?: ThirdPartyAccountInfo;
  pastGuardian?: GuardianConfig;
  failHandler?: () => void;
  paymentSecurityConfig?: ITransferLimitItem;
}

export enum GuardianVerifyType {
  CREATE_WALLET = 'CREATE_WALLET',
  ADD_GUARDIAN = 'ADD_GUARDIAN',
  MODIFY_GUARDIAN = 'MODIFY_GUARDIAN',
  REMOVE_GUARDIAN = 'REMOVE_GUARDIAN',
  CHANGE_LOGIN_GUARDIAN = 'CHANGE_LOGIN_GUARDIAN',
  EDIT_PAYMENT_SECURITY = 'EDIT_PAYMENT_SECURITY',
}

export type VerifiedGuardianInfo = CheckVerifyCodeResultDTO;
