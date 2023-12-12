import { GuardianConfig } from 'model/verify/guardian';
import { AccountOriginalType, VerifiedGuardianDoc } from 'model/verify/core';

export interface SignUpConfig {
  accountIdentifier: string;
  accountOriginalType: AccountOriginalType;
  guardianConfig?: GuardianConfig;
  navigateToGuardianPage: (guardianConfig: GuardianConfig, callback: (data: VerifiedGuardianDoc) => void) => void;
}
