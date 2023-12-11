import DeviceList from '@portkey/rn-sdk/src/pages/My/WalletSecurity/Device';
import DeviceDetail from '@portkey/rn-sdk/src/pages/My/WalletSecurity/Device/DeviceDetail';

const stackNav = [
  {
    name: 'DeviceList',
    component: DeviceList,
  },
  {
    name: 'DeviceDetail',
    component: DeviceDetail,
  },
] as const;

export default stackNav;
