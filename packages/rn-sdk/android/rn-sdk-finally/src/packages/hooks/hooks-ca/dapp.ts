import { useMemo, useCallback } from 'react';
import { useAppCASelector } from '@portkey/rn-sdk/src/packages/hooks/hooks-ca';
import { useCurrentWalletInfo, useWallet } from '@portkey/rn-sdk/src/packages/hooks/hooks-ca/wallet';
import { useAppCommonDispatch } from '@portkey/rn-sdk/src/packages/hooks';
import { updateSessionInfo } from 'packages/types/store-ca/dapp/actions';
import { useCurrentNetworkInfo } from '@portkey/rn-sdk/src/packages/hooks/hooks-ca/network';
import { NetworkType } from '@portkey/rn-sdk/src/packages/types';
import { SessionExpiredPlan, SessionInfo } from '@portkey/rn-sdk/src/packages/types/session';
import { formatExpiredTime, signSession } from '@portkey/rn-sdk/src/packages/utils/session';
import { AElfWallet } from '@portkey/rn-sdk/src/packages/types/aelf';
export const useDapp = () => useAppCASelector(state => state.dapp);
export const useDiscover = () => useAppCASelector(state => state.discover);

export const useCurrentDappList = () => {
  const { dappMap } = useDapp();
  const { currentNetwork } = useWallet();
  return useMemo(() => {
    return dappMap[currentNetwork];
  }, [currentNetwork, dappMap]);
};

export const useIsInCurrentDappList = () => {
  const list = useCurrentDappList();

  return useCallback(
    (origin: string): boolean => {
      return !!list?.some(ele => ele.origin === origin.trim());
    },
    [list],
  );
};

export const useCurrentDappInfo = (origin: string) => {
  const list = useCurrentDappList();
  return useMemo(() => list?.find(item => item.origin === origin), [list, origin]);
};

export const useUpdateSessionInfo = () => {
  const dispatch = useAppCommonDispatch();
  const { networkType } = useCurrentNetworkInfo();
  const { caHash } = useCurrentWalletInfo();
  return useCallback(
    (params: { networkType?: NetworkType; origin: string; expiredPlan?: SessionExpiredPlan; manager?: AElfWallet }) => {
      if (!caHash) return;
      let sessionInfo: SessionInfo | undefined = undefined;
      if (params.expiredPlan) {
        const { manager, expiredPlan } = params;
        if (!manager?.keyPair) return;
        const expiredTime = formatExpiredTime(expiredPlan);

        const baseSession = {
          origin: params.origin,
          expiredPlan,
          expiredTime,
          keyPair: manager.keyPair,
          managerAddress: manager.address,
          caHash,
        };

        const signature = signSession(baseSession);
        sessionInfo = {
          createTime: Date.now(),
          signature,
          expiredPlan,
          expiredTime,
        };
      }
      if (params.manager) delete params.manager;
      return dispatch(
        updateSessionInfo({
          ...params,
          networkType: params.networkType || networkType,
          sessionInfo,
        }),
      );
    },
    [caHash, dispatch, networkType],
  );
};
