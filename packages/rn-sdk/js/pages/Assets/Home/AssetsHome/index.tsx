import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import ReceiveButton from 'components/ReceiveButton';
import { TextM } from 'components/CommonText';
import FaucetButton from 'components/FaucetButton';
import { useUnlockedWallet } from 'model/wallet';
import { useCurrentNetworkType } from 'model/hooks/network';
import SendButton from 'components/SendButton';
import DashBoardTab from '../DashBoardTab';
import { useAccountTokenBalanceList, useSearchTokenList, useTokenPrices, useNftCollections } from 'model/hooks/balance';
import CustomHeader from 'components/CustomHeader';
import useBaseContainer from 'model/container/UseBaseContainer';
import AssetsContext, { AssetsContextType } from 'global/context/assets/AssetsContext';
import { divDecimals } from '@portkey-wallet/utils/converter';
import { ZERO } from '@portkey-wallet/constants/misc';

const AssetsHome: React.FC = () => {
  const { wallet } = useUnlockedWallet();
  const networkType = useCurrentNetworkType();

  const { balanceList, updateBalanceList } = useAccountTokenBalanceList();
  const { tokenList, updateTokensList } = useSearchTokenList();
  const { tokenPrices, updateTokenPrices } = useTokenPrices();
  const { nftCollections, updateNftCollections } = useNftCollections();

  const balanceUSD = useMemo(() => {
    return balanceList.reduce((acc, item) => {
      const { symbol, balance, decimals } = item;
      const price = tokenPrices.find(token => token.symbol === symbol)?.priceInUsd || 0;
      return acc.plus(divDecimals(balance, decimals).times(price));
    }, ZERO);
  }, [balanceList, tokenPrices]);

  const assetsContext: AssetsContextType = {
    balanceUSD,
    balanceList,
    updateBalanceList,
    allOfTokensList: tokenList,
    updateTokensList,
    tokenPrices,
    updateTokenPrices,
    nftCollections,
    updateNftCollections,
  };

  const isMainnet = networkType === 'MAIN';

  const { onFinish } = useBaseContainer({});

  return (
    <AssetsContext.Provider value={assetsContext}>
      <View style={[styles.cardWrap, styles.pagePaddingTop]}>
        <CustomHeader
          themeType={'blue'}
          titleDom={''}
          leftCallback={() => {
            onFinish({
              status: 'success',
              data: {
                finished: true,
              },
            });
          }}
        />
        <View style={styles.refreshWrap}>
          <Text style={styles.block} />
        </View>
        <Text style={styles.usdtBalance}>{isMainnet ? `$${balanceUSD.toFixed(2)}` : 'Dev Mode'}</Text>
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
          {isMainnet ? (
            <>
              <SendButton themeType="dashBoard" />
            </>
          ) : (
            <>
              <FaucetButton themeType="dashBoard" />
            </>
          )}
          {/* <ActivityButton themeType="dashBoard" /> */}
        </View>
      </View>
      <DashBoardTab />
    </AssetsContext.Provider>
  );
};

export default AssetsHome;
