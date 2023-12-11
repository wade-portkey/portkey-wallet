import aes from '@portkey/rn-sdk/src/packages/utils/aes';

export function checkPassword(AESEncryptMnemonic = '', password: string) {
  if (!AESEncryptMnemonic) return false;
  return aes.decrypt(AESEncryptMnemonic, password);
}
