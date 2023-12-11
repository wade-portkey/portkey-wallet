import { useRefreshTokenConfig } from '@portkey/rn-sdk/src/packages/hooks/hooks-ca/api';
import { renderHook, act } from '@testing-library/react';
import * as networkHooks from '@portkey/rn-sdk/src/packages/hooks/hooks-ca/network';
import * as walletHooks from '@portkey/rn-sdk/src/packages/hooks/hooks-ca/wallet';
import aes from '@portkey/rn-sdk/src/packages/utils/aes';
import AElf from 'aelf-sdk';
import * as utils from '@portkey/rn-sdk/src/packages/api/api-did/utils';
import { TestnetNetworkInfo } from '@portkey/rn-sdk/src/test/data/networkState';
import { currentWallet } from '@portkey/rn-sdk/src/test/data/chainInfo';

describe('useRefreshTokenConfig', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('no pin, and decrypt is not been called', () => {
    jest.spyOn(networkHooks, 'useCurrentNetworkInfo').mockReturnValue(TestnetNetworkInfo);
    jest.spyOn(walletHooks, 'useCurrentWalletInfo').mockReturnValue(currentWallet('TESTNET').walletInfo);
    jest.spyOn(walletHooks, 'useOriginChainId').mockReturnValue('AELF');
    jest.spyOn(aes, 'decrypt').mockReturnValue('');

    act(() => renderHook(() => useRefreshTokenConfig()));

    expect(networkHooks.useCurrentNetworkInfo).toBeCalledTimes(1);
    expect(walletHooks.useCurrentWalletInfo).toBeCalledTimes(1);
    expect(walletHooks.useOriginChainId).toBeCalledTimes(1);
    expect(aes.decrypt).toBeCalledTimes(0);
  });
  test('no privateKey, and getWalletByPrivateKey is not called', () => {
    jest.spyOn(networkHooks, 'useCurrentNetworkInfo').mockReturnValue(TestnetNetworkInfo);
    jest.spyOn(walletHooks, 'useCurrentWalletInfo').mockReturnValue(currentWallet('TESTNET').walletInfo);
    jest.spyOn(walletHooks, 'useOriginChainId').mockReturnValue('AELF');
    jest.spyOn(aes, 'decrypt').mockReturnValue('');
    jest.spyOn(AElf.wallet, 'getWalletByPrivateKey').mockReturnValue({});
    jest.spyOn(utils, 'setRefreshTokenConfig').mockImplementation(jest.fn());

    renderHook(() => useRefreshTokenConfig('123456'));

    expect(aes.decrypt).toBeCalledTimes(1);
    expect(AElf.wallet.getWalletByPrivateKey).toBeCalledTimes(0);
    expect(utils.setRefreshTokenConfig).toBeCalledTimes(0);
  });
  test('complete data, and all methods are called ', () => {
    jest.spyOn(networkHooks, 'useCurrentNetworkInfo').mockReturnValue(TestnetNetworkInfo);
    jest.spyOn(walletHooks, 'useCurrentWalletInfo').mockReturnValue(currentWallet('TESTNET').walletInfo);
    jest.spyOn(walletHooks, 'useOriginChainId').mockReturnValue('AELF');
    jest.spyOn(aes, 'decrypt').mockReturnValue('123...rgt');
    jest.spyOn(AElf.wallet, 'getWalletByPrivateKey').mockReturnValue({});
    jest.spyOn(utils, 'setRefreshTokenConfig').mockImplementation(jest.fn());

    renderHook(() => useRefreshTokenConfig('123456'));

    expect(aes.decrypt).toBeCalledTimes(1);
    expect(AElf.wallet.getWalletByPrivateKey).toBeCalledTimes(1);
    expect(utils.setRefreshTokenConfig).toBeCalledTimes(1);
  });
});
