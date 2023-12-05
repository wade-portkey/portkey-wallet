import { request } from 'packages/api/api-did';
import { useAppCASelector, useAppCommonDispatch } from 'packages/hooks';
import { useCurrentNetworkInfo } from 'packages/hooks/hooks-ca/network';
import { cleanBookmarkList, addBookmarkList } from 'packages/types/store-ca/discover/slice';
import { IBookmarkItem } from 'packages/types/store-ca/discover/type';
import { DISCOVER_BOOKMARK_MAX_COUNT } from 'packages/constants/constants-ca/discover';
import { useCallback, useMemo } from 'react';

export const useBookmarkList = () => {
  const { networkType } = useCurrentNetworkInfo();
  const dispatch = useAppCommonDispatch();
  const { discoverMap } = useAppCASelector(state => state.discover);

  const clean = useCallback(() => {
    dispatch(cleanBookmarkList(networkType));
  }, [dispatch, networkType]);

  const refresh = useCallback(
    async (skipCount = 0, maxResultCount = DISCOVER_BOOKMARK_MAX_COUNT) => {
      const result = await request.discover.getBookmarks({
        params: {
          skipCount,
          maxResultCount,
        },
      });

      if (skipCount === 0) {
        clean();
      }
      dispatch(addBookmarkList({ networkType, list: result.items || [] }));
      return result as {
        items: IBookmarkItem[];
        totalCount: number;
      };
    },
    [clean, dispatch, networkType],
  );

  const bookmarkList = useMemo(() => discoverMap?.[networkType]?.bookmarkList || [], [discoverMap, networkType]);

  return {
    refresh,
    clean,
    bookmarkList,
  };
};
