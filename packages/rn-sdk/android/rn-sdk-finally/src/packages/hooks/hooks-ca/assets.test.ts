import { AssetsState } from '@portkey/rn-sdk/src/test/data/assetsState';
import { renderHookWithProvider } from '@portkey/rn-sdk/src/test/utils/render';
import { setupStore } from '@portkey/rn-sdk/src/test/utils/setup';
import { useAssets } from '@portkey/rn-sdk/src/packages/hooks/hooks-ca/assets';

describe('useAssets', () => {
  test('get assets data successfully', () => {
    const { result } = renderHookWithProvider(useAssets, setupStore(AssetsState));

    expect(result.current).toHaveProperty('accountAssets');
    expect(result.current).toHaveProperty('accountBalance');
    expect(result.current).toHaveProperty('accountNFT');
    expect(result.current).toHaveProperty('accountToken');
    expect(result.current).toHaveProperty('tokenPrices');
  });
  test('failed to get assets data', () => {
    const { result } = renderHookWithProvider(useAssets, setupStore({}));

    expect(result.current).toBeUndefined();
  });
});
