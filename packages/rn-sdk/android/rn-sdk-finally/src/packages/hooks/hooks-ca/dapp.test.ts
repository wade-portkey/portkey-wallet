import { DappState } from '@portkey/rn-sdk/src/test/data/dappState';
import { renderHookWithProvider } from '@portkey/rn-sdk/src/test/utils/render';
import { setupStore } from '@portkey/rn-sdk/src/test/utils/setup';
import { useDapp, useCurrentDappList } from '@portkey/rn-sdk/src/packages/hooks/hooks-ca/dapp';
import * as walletHook from '@portkey/rn-sdk/src/packages/hooks/hooks-ca/wallet';

describe('useDapp', () => {
  test('get assets data successfully', () => {
    const { result } = renderHookWithProvider(useDapp, setupStore(DappState));

    expect(result.current).toEqual(DappState.dapp);
  });
  test('failed to get assets data', () => {
    const { result } = renderHookWithProvider(useDapp, setupStore({}));

    expect(result.current).toBeUndefined();
  });
});

describe('useCurrentDappList', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('get assets data successfully', () => {
    jest.spyOn(walletHook, 'useWallet').mockReturnValue({
      currentNetwork: 'TESTNET',
      walletAvatar: '',
      walletType: 'aelf',
      walletName: '',
      chainList: [],
    });
    const { result } = renderHookWithProvider(useCurrentDappList, setupStore(DappState));

    expect(result.current).toEqual(DappState.dapp.dappMap.TESTNET);
  });
  test('failed to get assets data', () => {
    jest.spyOn(walletHook, 'useWallet').mockReturnValue({
      currentNetwork: 'MAIN',
      walletAvatar: '',
      walletType: 'aelf',
      walletName: '',
      chainList: [],
    });
    const { result } = renderHookWithProvider(useCurrentDappList, setupStore(DappState));

    expect(result.current).toEqual(DappState.dapp.dappMap.MAIN);
  });
});
