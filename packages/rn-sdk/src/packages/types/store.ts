import chainSlice from 'packages/types/network/slice';
import { ChainState } from 'packages/types/network/types';
import { settingsSlice } from 'packages/types/settings/slice';
import { SettingsState } from 'packages/types/settings/types';
import { contactSlice, ContactState } from 'packages/types/store-ca/contact/slice';
import { tradeSlice, TradeState } from 'packages/types/trade/slice';

export type RootCommonState = {
  [chainSlice.name]: ChainState;
  [settingsSlice.name]: SettingsState;
  [tradeSlice.name]: TradeState;
  [contactSlice.name]: ContactState;
};
