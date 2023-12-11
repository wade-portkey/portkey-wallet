import { useAppCASelector, useAppCommonDispatch } from '@portkey/rn-sdk/src/packages/hooks';
import { fetchAllTokenListAsync, getSymbolImagesAsync } from 'packages/types/store-ca/tokenManagement/action';
import { TokenState, TokenItemShowType } from '@portkey/rn-sdk/src/packages/types/types-ca/token';
import { useMemo, useCallback, useEffect } from 'react';
import { useCurrentNetworkInfo } from '@portkey/rn-sdk/src/packages/hooks/hooks-ca/network';
import { request } from '@portkey/rn-sdk/src/packages/api/api-did';

export interface TokenFuncsType {
  fetchTokenList: (params: { keyword: string; chainIdArray: string[] }) => void;
  displayUserToken: (params: {
    tokenItem: TokenItemShowType;
    keyword: string;
    chainIdArray: string[];
  }) => Promise<void>;
}

export const useToken = (): [TokenState, TokenFuncsType] => {
  const dispatch = useAppCommonDispatch();
  const currentNetworkInfo = useCurrentNetworkInfo();

  const tokenState = useAppCASelector(state => state.tokenManagement);

  const fetchTokenList = useCallback(
    (params: { keyword: string; chainIdArray: string[] }) => {
      dispatch(
        fetchAllTokenListAsync({
          ...params,
        }),
      );
    },
    [dispatch],
  );

  const displayUserToken = useCallback(
    async ({
      tokenItem,
      keyword,
      chainIdArray,
    }: {
      tokenItem: TokenItemShowType;
      keyword: string;
      chainIdArray: string[];
    }) => {
      await request.token.displayUserToken({
        baseURL: currentNetworkInfo.apiUrl,
        resourceUrl: `${tokenItem.userTokenId}/display`,
        params: {
          isDisplay: !tokenItem.isAdded,
        },
      });
      setTimeout(() => {
        dispatch(fetchAllTokenListAsync({ keyword, chainIdArray }));
      }, 1000);
    },
    [currentNetworkInfo.apiUrl, dispatch],
  );

  const tokenStoreFuncs = {
    fetchTokenList,
    displayUserToken,
  };

  return [tokenState, tokenStoreFuncs];
};

export const useMarketTokenListInCurrentChain = (): TokenItemShowType[] => {
  const { tokenDataShowInMarket } = useAppCASelector(state => state.tokenManagement);

  return useMemo(() => tokenDataShowInMarket, [tokenDataShowInMarket]);
};

export const useIsFetchingTokenList = (): Boolean => {
  const { isFetching } = useAppCASelector(state => state.tokenManagement);

  return useMemo(() => isFetching, [isFetching]);
};

export const useFetchSymbolImages = () => {
  const dispatch = useAppCommonDispatch();

  useEffect(() => {
    dispatch(getSymbolImagesAsync());
  }, [dispatch]);
};

export const useSymbolImages = () => {
  const { symbolImages } = useAppCASelector(state => state.tokenManagement);
  return useMemo(() => symbolImages, [symbolImages]);
};

export default useToken;
