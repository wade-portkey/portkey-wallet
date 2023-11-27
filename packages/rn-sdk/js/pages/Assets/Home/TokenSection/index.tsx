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
import Loading from 'components/Loading';

export interface TokenSectionProps {
  getAccountBalance?: () => void;
}

export default function TokenSection() {
  const commonInfo = useCommonInfo();
  const [isFetching] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { balanceList, updateBalanceList, allOfTokensList, updateTokensList } =
    useContext<AssetsContextType>(AssetsContext);

  const itemData: Array<TokenItemShowType> = useMemo(() => {
    return allOfTokensList
      .filter(item => item.isDisplay)
      .map(item => {
        const balanceItem = balanceList.find(
          it => it.symbol === item.token.symbol && it.chainId === item.token.chainId,
        );
        console.log(typeof balanceItem?.balance);
        return {
          balance: balanceItem?.balance ?? '0',
          decimals: item.token.decimals,
          chainId: item.token.chainId,
          address: item.token.address,
          symbol: item.token.symbol,
          name: item.token.symbol,
          isDisplay: item.isDisplay,
        };
      }, []);
  }, [allOfTokensList, balanceList]);

  // const onNavigate = useCallback((_: TokenItemShowType) => {
  //   // item's onclick function is not used by now
  // }, []);

  const renderItem = useCallback(
    ({ item }: { item: TokenItemShowType }) => {
      console.log('before item', item);
      return <TokenListItem key={item.symbol} item={item} onPress={undefined} commonInfo={commonInfo} />;
    },
    [commonInfo],
  );

  const onRefresh = useCallback(async () => {
    Loading.show();
    try {
      await updateTokensList();
      await updateBalanceList();
    } catch (e) {
      console.warn('updateBalanceList or updateTokensList failed! ', e);
    }
    Loading.hide();
  }, [updateBalanceList, updateTokensList]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      onRefresh();
    }, REFRESH_TIME);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [onRefresh, updateBalanceList, updateTokensList]);

  return (
    <View style={styles.tokenListPageWrap}>
      <FlatList
        refreshing={isFetching}
        data={itemData || []}
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
