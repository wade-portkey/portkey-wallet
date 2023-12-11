import { useCallback } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { CACommonState } from '@portkey/rn-sdk/src/packages/types/types-ca/store';
import { useAppCommonDispatch } from '@portkey/rn-sdk/src/packages/hooks';
import { resetAssets } from '@portkey/rn-sdk/src/packages/store/store-ca/assets/slice';
import { resetRecent } from '@portkey/rn-sdk/src/packages/store/store-ca/recent/slice';
import { resetActivity } from '@portkey/rn-sdk/src/packages/store/store-ca/activity/slice';
import { resetContact } from '@portkey/rn-sdk/src/packages/store/store-ca/contact/actions';
import { resetGuardiansState } from '@portkey/rn-sdk/src/packages/store/store-ca/guardians/actions';
import { resetPayment } from '@portkey/rn-sdk/src/packages/store/store-ca/payment/actions';
import { resetTokenManagement } from '@portkey/rn-sdk/src/packages/store/store-ca/tokenManagement/slice';

export const useAppCASelector: TypedUseSelectorHook<CACommonState> = useSelector;

export function useResetStore() {
  const dispatch = useAppCommonDispatch();
  return useCallback(() => {
    dispatch(resetTokenManagement());
    dispatch(resetAssets());
    dispatch(resetRecent());
    dispatch(resetActivity());
    dispatch(resetGuardiansState());
    dispatch(resetContact());
    dispatch(resetPayment());
  }, [dispatch]);
}
