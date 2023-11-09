import { LoginType } from '@portkey-wallet/types/types-ca/wallet';
import { LOGIN_TYPE_LABEL_MAP } from '@portkey-wallet/constants/verifier';

export const LoginGuardianTypeIcon: any = {
  [LoginType.Email]: 'email',
  [LoginType.Phone]: 'phone',
  [LoginType.Google]: 'google-icon',
  [LoginType.Apple]: 'apple-icon',
};
export const LOGIN_TYPE_LIST = [
  {
    value: LoginType.Email,
    name: LOGIN_TYPE_LABEL_MAP[LoginType.Email],
    icon: LoginGuardianTypeIcon[LoginType.Email],
  },
  {
    value: LoginType.Phone,
    name: LOGIN_TYPE_LABEL_MAP[LoginType.Phone],
    icon: LoginGuardianTypeIcon[LoginType.Phone],
  },
  {
    value: LoginType.Google,
    name: LOGIN_TYPE_LABEL_MAP[LoginType.Google],
    icon: LoginGuardianTypeIcon[LoginType.Google],
  },
  {
    value: LoginType.Apple,
    name: LOGIN_TYPE_LABEL_MAP[LoginType.Apple],
    icon: LoginGuardianTypeIcon[LoginType.Apple],
  },
];
