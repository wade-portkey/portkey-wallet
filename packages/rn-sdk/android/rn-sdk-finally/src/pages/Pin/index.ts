import SetPin from '@portkey/rn-sdk/src/pages/Pin/SetPin';
import CheckPin from '@portkey/rn-sdk/src/pages/Pin/CheckPin';
import ConfirmPin from '@portkey/rn-sdk/src/pages/Pin/ConfirmPin';
import SetBiometrics from '@portkey/rn-sdk/src/pages/Pin/SetBiometrics';
const stackNav = [
  { name: 'SetPin', component: SetPin, options: { gestureEnabled: false } },
  { name: 'ConfirmPin', component: ConfirmPin },
  { name: 'SetBiometrics', component: SetBiometrics },
  { name: 'CheckPin', component: CheckPin },
] as const;

export default stackNav;
