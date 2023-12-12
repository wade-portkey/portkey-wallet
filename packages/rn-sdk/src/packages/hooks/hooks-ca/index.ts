import { useCallback } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { CACommonState } from 'packages/types/types-ca/store';
import { useAppCommonDispatch } from 'packages/hooks';
import { resetAssets } from 'packages/store/store-ca/assets/slice';
import { resetRecent } from 'packages/store/store-ca/recent/slice';
import { resetActivity } from 'packages/store/store-ca/activity/slice';
import { resetContact } from 'packages/store/store-ca/contact/actions';
import { resetGuardiansState } from 'packages/store/store-ca/guardians/actions';
import { resetPayment } from 'packages/store/store-ca/payment/actions';
import { resetTokenManagement } from 'packages/store/store-ca/tokenManagement/slice';

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
