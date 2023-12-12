import GuardianApproval from 'pages/Guardian/GuardianApproval';
import VerifierDetails from 'pages/Guardian/VerifierDetails';

const stackNav = [
  { name: 'GuardianApproval', component: GuardianApproval },
  { name: 'VerifierDetails', component: VerifierDetails },
] as const;

export default stackNav;
