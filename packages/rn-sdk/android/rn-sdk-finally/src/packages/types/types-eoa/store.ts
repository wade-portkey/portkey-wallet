import { tokenSlice } from 'packages/types/token/slice';
import { TokenState } from '@portkey/rn-sdk/src/packages/types/types-eoa/token';
import { tokenBalanceSlice } from 'packages/types/tokenBalance/slice';
import { tokenBalanceState } from '@portkey/rn-sdk/src/packages/types/types-eoa/tokenBalance';
import { RootCommonState } from '@portkey/rn-sdk/src/packages/types/store';
import { walletSlice } from 'packages/types/wallet/slice';
import { WalletState } from 'packages/types/wallet/type';
export type EOACommonState = RootCommonState & {
  [tokenSlice.name]: TokenState;
  [tokenBalanceSlice.name]: tokenBalanceState;
  [walletSlice.name]: WalletState;
};
