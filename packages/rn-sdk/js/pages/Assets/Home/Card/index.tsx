import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import ReceiveButton from 'components/ReceiveButton';
import ActivityButton from 'pages/Home/ActivityButton';
import { TextM } from 'components/CommonText';
import FaucetButton from 'components/FaucetButton';
import { useWalletBalanceUSD } from 'model/hooks/balance';
import { useUnlockedWallet } from 'model/wallet';
import { useCurrentNetworkType } from 'model/hooks/network';

const AssetsHome: React.FC = () => {
  const { wallet } = useUnlockedWallet();
  const networkType = useCurrentNetworkType();
  const { balanceUSD } = useWalletBalanceUSD();

  const isMainnet = networkType === 'MAIN';

  return (
    <View style={styles.cardWrap}>
      <View style={styles.refreshWrap}>
        <Text style={styles.block} />
      </View>
      <Text style={styles.usdtBalance}>{isMainnet ? `$${balanceUSD}` : 'Dev Mode'}</Text>
      <TextM style={styles.accountName}>{wallet?.name}</TextM>
      <View style={styles.buttonGroupWrap}>
        {/* ramp is now available by now */}
        {/* {isBuyButtonShow && (
          <>
            <BuyButton themeType="dashBoard" />
            <View style={styles.spacerStyle} />
          </>
        )} */}
        {/* send token is not available by now */}
        {/* <SendButton themeType="dashBoard" />
        <View style={styles.spacerStyle} /> */}
        <ReceiveButton themeType="dashBoard" />
        <View style={styles.spacerStyle} />
        {!isMainnet && (
          <>
            <FaucetButton themeType="dashBoard" />
            <View style={styles.spacerStyle} />
          </>
        )}
        <ActivityButton themeType="dashBoard" />
      </View>
    </View>
  );
};

export default AssetsHome;
