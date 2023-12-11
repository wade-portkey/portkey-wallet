import DappList from '@portkey/rn-sdk/src/pages/My/WalletSecurity/Dapp';
import DappDetail from '@portkey/rn-sdk/src/pages/My/WalletSecurity/Dapp/DappDetail';

const stackNav = [
  {
    name: 'DappList',
    component: DappList,
  },
  {
    name: 'DappDetail',
    component: DappDetail,
  },
] as const;

export default stackNav;
