import { createSlice } from '@reduxjs/toolkit';
import { the2ThFailedActivityItemType } from '@portkey/rn-sdk/src/packages/types/types-ca/activity';
import { getActivityListAsync } from '@portkey/rn-sdk/src/packages/store/store-ca/activity/action';
import { ActivityStateType } from '@portkey/rn-sdk/src/packages/store/store-ca/activity/type';
import { getCurrentActivityMapKey } from '@portkey/rn-sdk/src/packages/utils/activity';

const initialState: ActivityStateType = {
  activityMap: {},
  isFetchingActivities: false,
  failedActivityMap: {},
  isLoading: false,
};

//it automatically uses the immer library to let you write simpler immutable updates with normal mutative code
export const activitySlice = createSlice({
  name: 'activity',
  initialState: initialState,
  reducers: {
    addFailedActivity: (state, { payload }: { payload: the2ThFailedActivityItemType }) => {
      state.failedActivityMap[payload?.transactionId] = payload;
    },
    removeFailedActivity: (state, { payload }: { payload: string }) => {
      delete state.failedActivityMap[payload];
    },
    resetActivity: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getActivityListAsync.fulfilled, (state, action) => {
      const { data, totalRecordCount, skipCount, maxResultCount, chainId, symbol } = action.payload;
      const currentMapKey = getCurrentActivityMapKey(chainId, symbol);

      if (!state.activityMap) state.activityMap = {};

      state.activityMap[currentMapKey] = {
        data: skipCount === 0 ? data : [...state.activityMap[currentMapKey].data, ...data],
        totalRecordCount,
        skipCount,
        maxResultCount,
        chainId,
        symbol,
      };

      state.isLoading = false;
    });
    builder.addCase(getActivityListAsync.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getActivityListAsync.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const { addFailedActivity, removeFailedActivity, resetActivity } = activitySlice.actions;

export default activitySlice;
