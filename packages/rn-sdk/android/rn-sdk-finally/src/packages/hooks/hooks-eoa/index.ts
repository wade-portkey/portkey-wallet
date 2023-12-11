import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { EOACommonState } from '@portkey/rn-sdk/src/packages/types/types-eoa/store';

export const useAppEOASelector: TypedUseSelectorHook<EOACommonState> = useSelector;
