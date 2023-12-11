import { ContactIndexType, ContactItemType } from 'packages/types/types-ca/contact';
import { ContactState } from '@portkey/rn-sdk/src/packages/store/store-ca/contact/slice';

export interface FetchContractListAsyncPayloadType {
  isInit: boolean;
  contactIndexList?: ContactIndexType[];
  eventList?: ContactItemType[];
  lastModified: ContactState['lastModified'];
  isImputation: boolean;
}
