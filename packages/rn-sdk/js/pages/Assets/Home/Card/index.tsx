import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import ReceiveButton from 'components/ReceiveButton';
import ActivityButton from 'pages/Home/ActivityButton';
import { TextM } from 'components/CommonText';
import { useWallet } from '@portkey-wallet/hooks/hooks-ca/wallet';
import { useIsMainnet } from '@portkey-wallet/hooks/hooks-ca/network';
import { useAccountBalanceUSD } from '@portkey-wallet/hooks/hooks-ca/balances';
import FaucetButton from 'components/FaucetButton';

const Card: React.FC = () => {
  const isMainnet = useIsMainnet();
  const { walletName } = useWallet();
  const accountBalanceUSD = useAccountBalanceUSD();

  return (
    <View style={styles.cardWrap}>
      <View style={styles.refreshWrap}>
        <Text style={styles.block} />
      </View>
      <Text style={styles.usdtBalance}>{isMainnet ? `$${accountBalanceUSD}` : 'Dev Mode'}</Text>
      <TextM style={styles.accountName}>{walletName}</TextM>
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

export default Card;
