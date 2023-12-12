import { authenticationReady, touchAuth } from 'packages/utils/mobile/authentication';
import { isIOS } from 'packages/utils/mobile/device';
import secureStore, { SecureKeys } from 'packages/utils/mobile/secureStore';
export async function setSecureStoreItem(key: typeof SecureKeys[number] = 'Password', value: string) {
  const isReady = await authenticationReady();
  if (!isReady) throw { message: 'biometrics is not ready' };
  // authentication ready secure store password
  if (isIOS) {
    // iOS manually open authenticate
    const enrolled = await touchAuth();
    if (!enrolled.success) throw { message: enrolled.warning || enrolled.error };
  }
  // android secureStore requires authenticate by default
  await secureStore.setItemAsync(key, value);
}

export async function getSecureStoreItem(key: typeof SecureKeys[number] = 'Password') {
  const isReady = await authenticationReady();
  if (!isReady) throw { message: 'biometrics is not ready' };
  // android secureStore requires authenticate by default
  return secureStore.getItemAsync(key);
}
