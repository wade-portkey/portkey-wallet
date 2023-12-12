import { useCallback } from 'react';
import { request } from 'packages/api/api-did';
import { checkHolderError } from 'packages/utils/check';
import { handleErrorCode, handleErrorMessage } from 'packages/utils';
import { useAppCASelector } from 'packages/hooks/hooks-ca';

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
