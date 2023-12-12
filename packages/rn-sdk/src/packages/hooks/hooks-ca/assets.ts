import { useAppCASelector } from 'packages/hooks/hooks-ca';

export const useAssets = () => useAppCASelector(state => state.assets);
