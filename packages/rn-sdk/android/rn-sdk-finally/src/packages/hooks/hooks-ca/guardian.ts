import { useCallback } from 'react';
import { request } from '@portkey/rn-sdk/src/packages/api/api-did';
import { checkHolderError } from '@portkey/rn-sdk/src/packages/utils/check';
import { handleErrorCode, handleErrorMessage } from '@portkey/rn-sdk/src/packages/utils';
import { useAppCASelector } from '@portkey/rn-sdk/src/packages/hooks/hooks-ca';

export const useGetRegisterInfo = () => {
  return useCallback(async (info: { loginGuardianIdentifier?: string; caHash?: string }) => {
    try {
      if (info.loginGuardianIdentifier) {
        info.loginGuardianIdentifier = info.loginGuardianIdentifier.replaceAll(' ', '');
      }
      return await request.wallet.getRegisterInfo({
        params: info,
      });
    } catch (error: any) {
      const code = handleErrorCode(error);
      const message = handleErrorMessage(error);
      throw { message: checkHolderError(message, code), code };
    }
  }, []);
};

export const useGuardiansInfo = () => useAppCASelector(state => state.guardians);
