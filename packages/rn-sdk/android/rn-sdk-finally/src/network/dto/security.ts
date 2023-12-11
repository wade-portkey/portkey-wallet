import { ITransferLimitItem } from '@portkey/rn-sdk/src/model/security';

export interface CheckPaymentSecurityRuleParams {
  caHash: string;
  skipCount?: number;
  maxResultCount?: number;
}

export interface CheckPaymentSecurityRuleResult {
  data: ITransferLimitItem[];
  totalRecordCount: number;
}
