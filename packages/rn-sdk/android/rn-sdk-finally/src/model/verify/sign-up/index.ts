import { GuardianConfig } from '@portkey/rn-sdk/src/model/verify/guardian';
import { AccountOriginalType, VerifiedGuardianDoc } from '@portkey/rn-sdk/src/model/verify/core';

export interface SignUpConfig {
  accountIdentifier: string;
  accountOriginalType: AccountOriginalType;
  guardianConfig?: GuardianConfig;
  navigateToGuardianPage: (guardianConfig: GuardianConfig, callback: (data: VerifiedGuardianDoc) => void) => void;
}
