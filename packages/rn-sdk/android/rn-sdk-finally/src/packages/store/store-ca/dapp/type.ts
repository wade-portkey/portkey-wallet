import { NetworkType, Timestamp } from '@portkey/rn-sdk/src/packages/types';
import { SessionInfo } from '@portkey/rn-sdk/src/packages/types/session';

export type DappStoreItem = {
  origin: string;
  name?: string;
  icon?: string;
  sessionInfo?: SessionInfo;
  connectedTime?: Timestamp;
};

export interface IDappStoreState {
  dappMap: { [key in NetworkType]?: DappStoreItem[] };
}
