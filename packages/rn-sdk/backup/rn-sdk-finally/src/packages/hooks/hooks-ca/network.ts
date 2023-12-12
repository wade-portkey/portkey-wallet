import { useCurrentWallet } from 'packages/hooks/hooks-ca/wallet';
import { useMemo } from 'react';
import { NetworkList } from 'packages/constants/constants-ca/network';
import { useAppCASelector } from 'packages/hooks/hooks-ca';

export function useNetworkList() {
  return NetworkList;
}

export function useCurrentNetwork() {
  const { currentNetwork } = useCurrentWallet();
  return useMemo(() => currentNetwork, [currentNetwork]);
}

export function useVerifierList() {
  const { verifierMap } = useAppCASelector(state => state.guardians);
  return useMemo(() => (verifierMap ? Object.values(verifierMap) : []), [verifierMap]);
}

export function useIsTestnet() {
  const currentNetwork = useCurrentNetwork();
  return useMemo(() => currentNetwork === 'TESTNET', [currentNetwork]);
}

export function useIsMainnet() {
  const currentNetwork = useCurrentNetwork();
  return useMemo(() => currentNetwork === 'MAIN', [currentNetwork]);
}
