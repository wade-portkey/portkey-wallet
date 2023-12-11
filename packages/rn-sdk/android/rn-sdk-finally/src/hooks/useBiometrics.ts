import { useCallback, useState } from 'react';
import { authenticationReady } from '@portkey/rn-sdk/src/packages/utils/mobile/authentication';
import useEffectOnce from '@portkey/rn-sdk/src/hooks/useEffectOnce';

export default function useBiometricsReady() {
  const [biometricsReady, setBiometricsReady] = useState<boolean>();
  const getAuthenticationReady = useCallback(async () => {
    const ready = await authenticationReady();
    setBiometricsReady(ready);
  }, [setBiometricsReady]);
  useEffectOnce(() => {
    getAuthenticationReady();
  });
  return biometricsReady;
}
