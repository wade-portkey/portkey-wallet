import { useAppCASelector } from '@portkey/rn-sdk/src/packages/hooks/hooks-ca';

export const useAssets = () => useAppCASelector(state => state.assets);
