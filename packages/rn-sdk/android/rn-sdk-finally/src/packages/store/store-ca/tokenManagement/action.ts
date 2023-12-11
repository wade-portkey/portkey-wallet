import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { HandleTokenArgTypes } from '@portkey/rn-sdk/src/packages/types/types-ca/token';
import { fetchAllTokenList } from '@portkey/rn-sdk/src/packages/store/store-ca/tokenManagement/api';
import { request } from '@portkey/rn-sdk/src/packages/api/api-did';

export const addTokenInCurrentAccount = createAction<HandleTokenArgTypes>('token/addTokenInCurrentAccount');

export const deleteTokenInCurrentAccount = createAction<HandleTokenArgTypes>('token/deleteTokenInCurrentAccount');

export const fetchAllTokenListAsync = createAsyncThunk(
  'tokenManagement/fetchAllTokenListAsync',
  async ({ keyword = '', chainIdArray }: { keyword?: string; chainIdArray?: string[] }) => {
    const response = await fetchAllTokenList({ keyword, chainIdArray: chainIdArray || [] });

    return { list: response.items, totalRecordCount: response.totalRecordCount };
  },
);

export const getSymbolImagesAsync = createAsyncThunk('tokenManagement/getSymbolImagesAsync', async () => {
  const response = await request.assets.getSymbolImages({});
  return response.symbolImages;
});
