import { useAppleAuthentication, useGoogleAuthentication } from 'model/hooks/authentication';
import { useCallback } from 'react';
import { GuardianConfig } from '../guardian';
import { AppleAccountInfo, GoogleAccountInfo } from '../third-party-account';

export const useThirdPartyLoginAtomic = (): {
  appleLoginAdapter: () => Promise<AppleAccountInfo>;
  googleLoginAdapter: () => Promise<GoogleAccountInfo>;
} => {
  const { appleSign } = useAppleAuthentication();
  const { googleSign } = useGoogleAuthentication();

  const appleLoginAdapter = useCallback(async (): Promise<AppleAccountInfo> => {
    const userInfo = await appleSign();
    return {
      accountIdentifier: userInfo?.user?.id,
      identityToken: userInfo?.identityToken,
    };
  }, [appleSign]);

  const googleLoginAdapter = useCallback(async (): Promise<GoogleAccountInfo> => {
    const userInfo = await googleSign();
    return {
      accountIdentifier: userInfo?.user?.id,
      accessToken: userInfo?.accessToken,
    };
  }, [googleSign]);

  return {
    appleLoginAdapter,
    googleLoginAdapter,
  };
};

export const useNonThirdPartySignInAtomic = async (
  accountIdentifier: string,
  entryName: string,
): Promise<GuardianConfig | null> => {
  throw new Error('Not implemented');
};
