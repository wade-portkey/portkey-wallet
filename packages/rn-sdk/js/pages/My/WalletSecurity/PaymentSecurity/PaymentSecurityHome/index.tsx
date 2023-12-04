import React, { memo, useCallback, useState } from 'react';
import PageContainer from 'components/PageContainer';
import { StyleSheet, FlatList, View } from 'react-native';
import { defaultColors } from 'assets/theme';
import GStyles from 'assets/theme/GStyles';
import { TextL, TextM } from 'components/CommonText';

import { BGStyles, FontStyles } from 'assets/theme/styles';
import { pTd } from 'utils/unit';
import useEffectOnce from 'hooks/useEffectOnce';
import CommonToast from 'components/CommonToast';
import Touchable from 'components/Touchable';
import isEqual from 'lodash/isEqual';
import CommonAvatar from 'components/CommonAvatar';
import Svg from 'components/Svg';
import { formatChainInfoToShow } from '@portkey-wallet/utils';
import NoData from 'components/NoData';
import { ITransferLimitItem } from 'model/security';
import { useTransferLimitList } from 'model/hooks/payment';
import { useCurrentNetworkInfo } from 'hooks/network';
import Loading from 'components/Loading';
import { useCommonInfo, useSymbolImages } from 'components/TokenOverlay/hooks';

const _renderPaymentSecurityItem = ({ item }: { item: ITransferLimitItem }) => {
  const { defaultToken } = useCommonInfo();
  const symbolImages = useSymbolImages();
  const networkType = useCurrentNetworkInfo();

  return (
    <Touchable
      onPress={() => {
        // TODO details page
        // navigationService.navigate('PaymentSecurityDetail', { transferLimitDetail: item });
      }}>
      <View style={ItemStyles.wrap}>
        <CommonAvatar
          hasBorder
          shapeType="circular"
          title={item.symbol}
          svgName={item.symbol === defaultToken.symbol ? 'elf-icon' : undefined}
          imageUrl={symbolImages[item.symbol]}
          avatarSize={pTd(32)}
        />
        <View style={ItemStyles.content}>
          <TextL style={ItemStyles.symbolLabel}>{item.symbol || ''}</TextL>
          <TextM style={FontStyles.font7}>{formatChainInfoToShow(item.chainId, networkType)}</TextM>
        </View>
        <Svg icon="right-arrow" size={pTd(20)} color={defaultColors.icon1} />
      </View>
    </Touchable>
  );
};
const PaymentSecurityItem = memo(_renderPaymentSecurityItem, (prevProps, nextProps) =>
  isEqual(prevProps.item, nextProps.item),
);

const ItemStyles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    paddingHorizontal: pTd(16),
    backgroundColor: defaultColors.bg1,
    marginBottom: pTd(24),
    height: pTd(72),
    borderRadius: pTd(6),
    alignItems: 'center',
  },
  content: {
    marginHorizontal: pTd(16),
    flex: 1,
  },
  symbolLabel: {
    marginBottom: pTd(2),
  },
});

const PaymentSecurityList: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { list, isNext, next, init } = useTransferLimitList();

  const getList = useCallback(async () => {
    if (!isNext) return;
    setIsRefreshing(true);
    try {
      Loading.show();
      await next();
      Loading.hide();
    } catch (error) {
      console.log('PaymentSecurityList: error', error);
      CommonToast.failError('Failed to fetch data');
    }

    setIsRefreshing(false);
  }, [isNext, next]);

  useEffectOnce(() => {
    const timer = setTimeout(() => {
      Loading.show();
      init();
      Loading.hide();
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <PageContainer
      titleDom={'Payment Security'}
      safeAreaColor={['blue', 'gray']}
      containerStyles={pageStyles.pageWrap}
      hideTouchable={true}
      scrollViewProps={{ disabled: true }}>
      <FlatList
        style={pageStyles.listWrap}
        refreshing={isRefreshing}
        data={list || []}
        keyExtractor={(item: ITransferLimitItem) => `${item.chainId}_${item.symbol}`}
        renderItem={({ item }) => <PaymentSecurityItem item={item} />}
        onRefresh={() => init()}
        onEndReached={() => getList()}
        ListEmptyComponent={() => <NoData style={BGStyles.bg4} topDistance={pTd(95)} message="No asset" />}
      />
    </PageContainer>
  );
};

const pageStyles = StyleSheet.create({
  pageWrap: {
    backgroundColor: defaultColors.bg4,
    paddingHorizontal: 0,
  },
  listWrap: {
    ...GStyles.paddingArg(24, 20, 18),
  },
  tipsWrap: {
    lineHeight: pTd(20),
    marginBottom: pTd(24),
  },
});

export default PaymentSecurityList;
