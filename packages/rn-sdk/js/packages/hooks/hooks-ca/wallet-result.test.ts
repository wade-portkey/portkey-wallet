jest.mock('packages/socket/socket-did');
jest.mock('packages/utils');
jest.mock('packages/hooks/hooks-ca/network');

import { renderHook } from '@testing-library/react';
import { useFetchWalletCAAddress } from './wallet-result';
import Socket from 'packages/socket/socket-did';
import * as walletUtils from 'packages/api/api-did/utils/wallet';
import { useCurrentApiUrl } from 'packages/hooks/hooks-ca/network';
import { VerificationType } from 'packages/types/verifier';
import { CaAccountRecoverResult, CaAccountRegisterResult } from 'packages/types/types-ca/wallet';

describe('useFetchWalletCAAddress', () => {
  test('register success', async () => {
    jest.mocked(useCurrentApiUrl).mockReturnValue('https://localhost/chain');
    const remove = () => jest.fn();
    jest
      .spyOn(Socket, 'onCaAccountRegister')
      .mockImplementation(
        (_obj: { clientId: string; requestId: string }, callback: (data: CaAccountRegisterResult) => void) => {
          callback({
            body: { registerStatus: 'pass', registerMessage: '', caAddress: '', caHash: '' },
            requestId: '',
          });
          return { remove };
        },
      );
    // jest.spyOn(Socket, 'onCaAccountRecover').mockReturnValue({ remove });
    jest
      .spyOn(walletUtils, 'requestCreateWallet')
      .mockReturnValueOnce(Promise.resolve({ registerStatus: 'pending' }))
      .mockReturnValue(Promise.resolve({ registerStatus: 'success' }));

    const { result } = renderHook(() => useFetchWalletCAAddress());
    const walletResult = await result.current({
      clientId: 'AELF',
      requestId: '',
      verificationType: VerificationType.register,
      managerUniqueId: '',
    });

    expect(result.current).toBeEnabled;
    expect(walletResult.status).toBe('pass');
  });
  test('registerStatus type is not string', async () => {
    jest.mocked(useCurrentApiUrl).mockReturnValue('https://localhost/chain');
    const remove = () => jest.fn();
    jest
      .spyOn(Socket, 'onCaAccountRegister')
      .mockImplementation(
        (_obj: { clientId: string; requestId: string }, callback: (data: CaAccountRegisterResult) => void) => {
          callback({
            body: { registerStatus: 0, registerMessage: '', caAddress: '', caHash: '' },
            requestId: '',
          } as any);
          return { remove };
        },
      );
    // jest.spyOn(Socket, 'onCaAccountRecover').mockReturnValue({ remove });
    jest
      .spyOn(walletUtils, 'requestCreateWallet')
      .mockReturnValueOnce(Promise.resolve({ registerStatus: 'pending' }))
      .mockReturnValue(Promise.resolve({ registerStatus: 'success' }));

    const { result } = renderHook(() => useFetchWalletCAAddress());
    const walletResult = await result.current({
      clientId: 'AELF',
      requestId: '',
      verificationType: VerificationType.register,
      managerUniqueId: '',
    });

    expect(result.current).toBeEnabled;
    expect(walletResult.status).toBe('success');
  });

  test('recovery success', async () => {
    jest.mocked(useCurrentApiUrl).mockReturnValue('https://localhost/chain');
    const remove = () => jest.fn();
    jest.spyOn(Socket, 'onCaAccountRegister').mockReturnValue({ remove });
    jest
      .spyOn(Socket, 'onCaAccountRecover')
      .mockImplementation(
        (_obj: { clientId: string; requestId: string }, callback: (data: CaAccountRecoverResult) => void) => {
          callback({
            body: { recoveryStatus: 'pass', recoveryMessage: '', caAddress: '', caHash: '' },
            requestId: '',
          } as any);
          return { remove };
        },
      );
    jest.spyOn(walletUtils, 'requestCreateWallet').mockReturnValue(Promise.resolve({ recoveryStatus: 'success' }));

    const { result } = renderHook(() => useFetchWalletCAAddress());
    const walletResult = await result.current({
      clientId: 'AELF',
      requestId: '',
      verificationType: VerificationType.communityRecovery,
      managerUniqueId: '',
    });

    expect(result.current).toBeEnabled;
    expect(walletResult.status).toBe('pass');
  });
});
