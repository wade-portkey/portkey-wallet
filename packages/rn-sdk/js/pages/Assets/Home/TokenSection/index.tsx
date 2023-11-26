import React, { useCallback, useState, useEffect, useRef, useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { View, FlatList } from 'react-native';
import { TokenItemShowType } from '@portkey-wallet/types/types-ca/token';
import { defaultColors } from 'assets/theme';
import { pTd } from 'utils/unit';
import TokenListItem from 'components/TokenListItem';
import { REFRESH_TIME } from '@portkey-wallet/constants/constants-ca/assets';
import { useCommonInfo } from 'components/TokenOverlay/hook';
import AssetsContext, { AssetsContextType } from 'global/context/assets/AssetsContext';

export interface TokenSectionProps {
  getAccountBalance?: () => void;
}

const tokenItemFilterWhiteList = ['ELF'];

export default function TokenSection() {
  const commonInfo = useCommonInfo();
  const [isFetching] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { balanceList, updateBalanceList } = useContext<AssetsContextType>(AssetsContext);

  const itemData: Array<TokenItemShowType> = useMemo(() => {
    return balanceList.map(item => {
      return {
        ...item,
        chainId: item.chainId as any,
        currentNetwork: commonInfo.currentNetwork,
        currentCaAddress: commonInfo.currentCaAddress,
        defaultToken: commonInfo.defaultToken,
        address: 'fake',
        name: item.symbol,
      };
    });
  }, [balanceList, commonInfo.currentCaAddress, commonInfo.currentNetwork, commonInfo.defaultToken]);

  const onNavigate = useCallback((_: TokenItemShowType) => {
    // item's onclick function is not used by now
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: TokenItemShowType }) => {
      return <TokenListItem key={item.symbol} item={item} onPress={() => onNavigate(item)} commonInfo={commonInfo} />;
    },
    [commonInfo, onNavigate],
  );

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      updateBalanceList();
    }, REFRESH_TIME);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [updateBalanceList]);

  const onRefresh = useCallback(() => {
    updateBalanceList();
  }, [updateBalanceList]);

  return (
    <View style={styles.tokenListPageWrap}>
      <FlatList
        refreshing={isFetching}
        data={handleTokenFilter(itemData) || []}
        renderItem={renderItem}
        keyExtractor={(item: TokenItemShowType) => item.symbol + item.chainId}
        onRefresh={onRefresh}
        // addToken not available by now
        // ListFooterComponent={
        //   <TouchableOpacity
        //     style={styles.addWrap}
        //     onPress={() => {
        //       navigationService.navigate('ManageTokenList');
        //     }}>
        //     <Svg icon="add-token" size={20} />
        //     <TextM style={styles.addTokenText}>{t('Add Tokens')}</TextM>
        //   </TouchableOpacity>
        // }
      />
    </View>
  );
}

const handleTokenFilter = (tokenList: TokenItemShowType[]) => {
  return tokenList.filter(item => {
    return (item.balance && item.balance !== '0') || tokenItemFilterWhiteList.some(symbol => symbol === item.symbol);
  });
};

const styles = StyleSheet.create({
  tokenListPageWrap: {
    flex: 1,
    backgroundColor: defaultColors.bg1,
  },
  addWrap: {
    shadowColor: 'red',
    marginTop: pTd(24),
    marginBottom: pTd(24),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTokenText: {
    marginLeft: pTd(8),
    color: defaultColors.font4,
  },
});
