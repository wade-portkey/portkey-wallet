import {
  useGetCurrentAccountTokenPrice,
  useFreshTokenPrice,
  useAmountInUsdShow,
  useIsTokenHasPrice,
} from '@portkey/rn-sdk/src/packages/hooks/hooks-ca/useTokensPrice';
import * as assetSlice from 'packages/types/store-ca/assets/slice';
import * as baseHooks from '@portkey/rn-sdk/src/packages/hooks';
import { renderHookWithProvider } from '@portkey/rn-sdk/src/test/utils/render';
import { setupStore } from '@portkey/rn-sdk/src/test/utils/setup';
import { AssetsState } from '@portkey/rn-sdk/src/test/data/assetsState';
import * as networkHooks from '@portkey/rn-sdk/src/packages/hooks/hooks-ca/network';

describe('useGetCurrentAccountTokenPrice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('complete data, and return successfully', () => {
    jest.spyOn(baseHooks, 'useAppCommonDispatch').mockReturnValue(() => async (call: () => void) => {
      return call;
    });
    jest.spyOn(assetSlice, 'fetchTokensPriceAsync').mockReturnValue({} as any);
    const { result } = renderHookWithProvider(useGetCurrentAccountTokenPrice, setupStore(AssetsState));
    expect(result.current[1]).toBeInstanceOf(Function);

    result.current[1]();
    expect(assetSlice.fetchTokensPriceAsync).toHaveBeenCalledTimes(1);
  });

  test('set ELF params, and return successfully', () => {
    jest.spyOn(baseHooks, 'useAppCommonDispatch').mockReturnValue(() => async (call: () => void) => {
      return call;
    });
    jest.spyOn(assetSlice, 'fetchTokensPriceAsync').mockReturnValue({} as any);
    const { result } = renderHookWithProvider(useGetCurrentAccountTokenPrice, setupStore(AssetsState));
    expect(result.current[1]).toBeInstanceOf(Function);

    result.current[1]('ELF');
    expect(assetSlice.fetchTokensPriceAsync).toHaveBeenCalledTimes(1);
  });

  test('no accountToken data, and do not call fetchTokensPriceAsync method', () => {
    jest.spyOn(baseHooks, 'useAppCommonDispatch').mockReturnValue(() => async (call: () => void) => {
      return call;
    });
    const { result } = renderHookWithProvider(
      useGetCurrentAccountTokenPrice,
      setupStore({ assets: { ...AssetsState.assets, accountToken: [] } }),
    );
    expect(result.current[1]).toBeInstanceOf(Function);

    result.current[1]();
    expect(assetSlice.fetchTokensPriceAsync).toHaveBeenCalledTimes(0);
  });

  test('set ELF params, and call getTokensPrice method', () => {
    jest.spyOn(baseHooks, 'useAppCommonDispatch').mockReturnValue(() => async (call: () => void) => {
      return call;
    });
    const { result } = renderHookWithProvider(
      useGetCurrentAccountTokenPrice,
      setupStore({ assets: { ...AssetsState.assets, accountToken: [] } }),
    );
    expect(result.current[2]).toBeInstanceOf(Function);

    result.current[2]();
    expect(assetSlice.fetchTokensPriceAsync).toHaveBeenCalledTimes(1);
  });
});

describe('useFreshTokenPrice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Mainnet, and fetchTokensPriceAsync method is called', () => {
    jest.spyOn(baseHooks, 'useAppCommonDispatch').mockReturnValue(() => async (call: () => void) => {
      return call;
    });
    jest.spyOn(assetSlice, 'fetchTokensPriceAsync').mockReturnValue({} as any);
    jest.spyOn(networkHooks, 'useIsMainnet').mockReturnValue(true);

    renderHookWithProvider(useFreshTokenPrice, setupStore(AssetsState));

    expect(assetSlice.fetchTokensPriceAsync).toBeCalledTimes(1);
  });

  test('Testnet, and fetchTokensPriceAsync method is not called', () => {
    jest.spyOn(baseHooks, 'useAppCommonDispatch').mockReturnValue(() => async (call: () => void) => {
      return call;
    });
    jest.spyOn(networkHooks, 'useIsMainnet').mockReturnValue(false);

    renderHookWithProvider(useFreshTokenPrice, setupStore({ assets: { ...AssetsState.assets, accountToken: [] } }));

    expect(assetSlice.fetchTokensPriceAsync).toBeCalledTimes(0);
  });
});

describe('useAmountInUsdShow', () => {
  test('ELF price is 0.294964, and return successful usd', () => {
    jest.spyOn(baseHooks, 'useAppCommonDispatch').mockReturnValue(() => async (call: () => void) => {
      return call;
    });
    jest.spyOn(assetSlice, 'fetchTokensPriceAsync').mockReturnValue({} as any);
    const { result } = renderHookWithProvider(useAmountInUsdShow, setupStore(AssetsState));
    const res = result.current(100, 0, 'ELF');
    expect(res).toEqual('$ 29.49');
  });
  test('ELF price is 0, and return empty string', () => {
    jest.spyOn(baseHooks, 'useAppCommonDispatch').mockReturnValue(() => async (call: () => void) => {
      return call;
    });
    jest.spyOn(assetSlice, 'fetchTokensPriceAsync').mockReturnValue({} as any);
    const { result } = renderHookWithProvider(
      useAmountInUsdShow,
      setupStore({
        assets: { ...AssetsState.assets, tokenPrices: { isFetching: false, tokenPriceObject: { ELF: 0 } } },
      }),
    );
    const res = result.current(100, 0, 'ELF');
    expect(res).toEqual('');
  });
});

describe('useIsTokenHasPrice', () => {
  test('complete data, and return successfully', () => {
    const { result } = renderHookWithProvider(useIsTokenHasPrice, setupStore(AssetsState));
    expect(result.current).toBeFalsy();
  });

  test('complete data, and return successfully', () => {
    const { result } = renderHookWithProvider(() => useIsTokenHasPrice('ETH'), setupStore(AssetsState));
    expect(result.current).toBeFalsy();
  });

  test('complete data, and return successfully', () => {
    const { result } = renderHookWithProvider(() => useIsTokenHasPrice('ELF'), setupStore(AssetsState));
    expect(result.current).toBeTruthy();
  });
});
