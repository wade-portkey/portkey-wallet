import SetPin from 'pages/Pin/SetPin';
import CheckPin from 'pages/Pin/CheckPin';
import ConfirmPin from 'pages/Pin/ConfirmPin';
import SetBiometrics from 'pages/Pin/SetBiometrics';
const stackNav = [
  { name: 'SetPin', component: SetPin, options: { gestureEnabled: false } },
  { name: 'ConfirmPin', component: ConfirmPin },
  { name: 'SetBiometrics', component: SetBiometrics },
  { name: 'CheckPin', component: CheckPin },
] as const;

export default stackNav;
