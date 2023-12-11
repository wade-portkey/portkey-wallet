import GuardianApproval from '@portkey/rn-sdk/src/pages/Guardian/GuardianApproval';
import VerifierDetails from '@portkey/rn-sdk/src/pages/Guardian/VerifierDetails';

const stackNav = [
  { name: 'GuardianApproval', component: GuardianApproval },
  { name: 'VerifierDetails', component: VerifierDetails },
] as const;

export default stackNav;
