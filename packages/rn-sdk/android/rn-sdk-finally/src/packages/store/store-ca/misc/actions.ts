import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { request } from '@portkey/rn-sdk/src/packages/api/api-did';
import { NetworkType } from '@portkey/rn-sdk/src/packages/types';
import { MiscState } from '@portkey/rn-sdk/src/packages/store/store-ca/misc/types';
import { NetworkList } from '@portkey/rn-sdk/src/packages/constants/constants-ca/network';
import { DefaultCountry } from '@portkey/rn-sdk/src/packages/constants/constants-ca/country';
import { CountryItem } from '@portkey/rn-sdk/src/packages/types/types-ca/country';

export const getPhoneCountryCode = createAsyncThunk<
  Required<Pick<MiscState, 'phoneCountryCodeListChainMap' | 'defaultPhoneCountryCode'>>,
  NetworkType
>('misc/getPhoneCountryCode', async (network: NetworkType) => {
  const networkInfo = NetworkList.find(item => item.networkType === network);
  if (!networkInfo) {
    throw new Error('networkInfo not found');
  }
  const result = await request.wallet.getPhoneCountryCode({
    baseURL: networkInfo.apiUrl,
  });

  if (result.data && Array.isArray(result.data)) {
    return {
      phoneCountryCodeListChainMap: {
        [network]: result.data,
      },
      defaultPhoneCountryCode: result.locateData || DefaultCountry,
    };
  } else {
    throw new Error('getPhoneCountryCode error');
  }
});

export const setLocalPhoneCountryCodeAction = createAction<CountryItem>('misc/setContact');
