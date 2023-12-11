import { NetworkItem } from '@portkey/rn-sdk/src/packages/types/types-ca/network';
import { BackEndNetWorkMap } from '@portkey/rn-sdk/src/packages/constants/constants-ca/backend-network';

export const NetworkList: NetworkItem[] = [BackEndNetWorkMap['back-end-test2'], BackEndNetWorkMap['back-end-test1']];

export const DefaultChainId = 'AELF';

export const OfficialWebsite = 'https://portkey.finance';
export const BingoGame = 'http://192.168.66.240:3000';

export const ThirdParty = `https://openlogin-test.portkey.finance`;
