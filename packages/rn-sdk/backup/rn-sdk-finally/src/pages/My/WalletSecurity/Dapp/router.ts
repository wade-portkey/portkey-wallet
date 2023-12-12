import DappList from 'pages/My/WalletSecurity/Dapp';
import DappDetail from 'pages/My/WalletSecurity/Dapp/DappDetail';

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
