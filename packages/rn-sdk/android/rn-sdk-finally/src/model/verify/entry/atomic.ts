import { useAppleAuthentication, useGoogleAuthentication } from '@portkey/rn-sdk/src/model/hooks/authentication';
import { useCallback } from 'react';
import { GuardianConfig } from '@portkey/rn-sdk/src/model/verify/guardian';
import { AppleAccountInfo, GoogleAccountInfo } from '@portkey/rn-sdk/src/model/verify/third-party-account';

export const useThirdPartyVerifyAtomic = (): {
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

export const useNonThirdPartySignInAtomic = (
  entryName: string,
): {
  phoneOrEmailVerify: (params: { accountIdentifier: string }) => Promise<GuardianConfig>;
} => {
  throw new Error('Not implemented');
};
