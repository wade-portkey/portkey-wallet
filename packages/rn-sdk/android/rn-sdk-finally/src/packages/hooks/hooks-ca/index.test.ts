import { AssetsState } from '@portkey/rn-sdk/src/test/data/assetsState';
import { renderHookWithProvider } from '@portkey/rn-sdk/src/test/utils/render';
import { setupStore } from '@portkey/rn-sdk/src/test/utils/setup';
import { useAppCASelector, useResetStore } from '@portkey/rn-sdk/src/packages/hooks/hooks-ca';
import * as indexHook from '@portkey/rn-sdk/src/packages/hooks';
import { renderHook } from '@testing-library/react';
import React from 'react';

describe('useAppCASelector', () => {
  test('should first', () => {
    const useAssets = () => {
      return useAppCASelector(state => state.assets);
    };
    const { result } = renderHookWithProvider(useAssets, setupStore(AssetsState));
    expect(result.current).toEqual(AssetsState.assets);
  });
});

describe('useResetStore', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('should first', () => {
    jest.spyOn(React, 'useCallback').mockImplementation((call: Function) => {
      return call();
    });
    const fun = () => {
      return jest.fn();
    };
    jest.spyOn(indexHook, 'useAppCommonDispatch').mockImplementation(fun);

    const resetStore = useResetStore();
    renderHook(() => resetStore);

    expect(React.useCallback).toHaveBeenCalledTimes(1);
  });
});
