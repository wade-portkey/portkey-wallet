import { isEnrolledAsync } from 'expo-local-authentication';
import { getUseBiometric } from '@portkey/rn-sdk/src/model/verify/core';
import { touchAuth } from '@portkey/rn-sdk/src/pages/Pin/SetBiometrics';
import { Platform } from 'react-native';
import { PortkeyModulesEntity } from '@portkey/rn-sdk/src/service/native-modules';

export async function authenticateBioAsync() {
  const options = {
    hintMessage: 'Verify your identity',
    fallbackLabel: 'Use password',
    promptMessage: 'AELF identity authentication',
    disableDeviceFallback: false,
    requireConfirmation: false,
  };
  if (Platform.OS === 'ios') {
    return touchAuth();
  } else {
    await delay(200); // should delay 200ms, Otherwise native will get destroyed activity
    return PortkeyModulesEntity.BiometricModule.bioAuthenticateAsync(options);
  }
}

export async function authenticateBioReady(): Promise<boolean> {
  if (Platform.OS === 'ios') {
    return isEnrolledAsync();
  } else {
    return PortkeyModulesEntity.BiometricModule.isEnrolledAsync();
  }
}
export async function isBiometricsCanUse() {
  return getUseBiometric();
}

function delay(ms: number | undefined) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
