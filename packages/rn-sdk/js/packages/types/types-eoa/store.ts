import { tokenSlice } from 'packages/types/token/slice';
import { TokenState } from 'packages/types/types-eoa/token';
import { tokenBalanceSlice } from 'packages/types/tokenBalance/slice';
import { tokenBalanceState } from './tokenBalance';
import { RootCommonState } from '../store';
import { walletSlice } from 'packages/types/wallet/slice';
import { WalletState } from 'packages/types/wallet/type';
export type EOACommonState = RootCommonState & {
  [tokenSlice.name]: TokenState;
  [tokenBalanceSlice.name]: tokenBalanceState;
  [walletSlice.name]: WalletState;
};
