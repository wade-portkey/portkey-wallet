import React, { memo, useCallback, useState } from 'react';
import PageContainer from '@portkey/rn-sdk/src/components/PageContainer';
import { StyleSheet, FlatList, View } from 'react-native';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import { TextL, TextM } from '@portkey/rn-sdk/src/components/CommonText';

import { BGStyles, FontStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import CommonToast from '@portkey/rn-sdk/src/components/CommonToast';
import Touchable from '@portkey/rn-sdk/src/components/Touchable';
import isEqual from 'lodash/isEqual';
import CommonAvatar from '@portkey/rn-sdk/src/components/CommonAvatar';
import Svg from '@portkey/rn-sdk/src/components/Svg';
import { formatChainInfoToShow } from '@portkey/rn-sdk/src/packages/utils';
import NoData from '@portkey/rn-sdk/src/components/NoData';
import { ITransferLimitItem } from '@portkey/rn-sdk/src/model/security';
import { useTransferLimitList } from '@portkey/rn-sdk/src/model/hooks/payment';
import { useCurrentNetworkInfo } from '@portkey/rn-sdk/src/hooks/network';
import { useCommonNetworkInfo, useSymbolImages } from '@portkey/rn-sdk/src/components/TokenOverlay/hooks';
import useBaseContainer from '@portkey/rn-sdk/src/model/container/UseBaseContainer';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import { PaymentSecurityDetailProps } from '@portkey/rn-sdk/src/pages/My/WalletSecurity/PaymentSecurity/PaymentSecurityDetail';
import { GuardiansApprovalIntent } from '@portkey/rn-sdk/src/pages/GuardianManage/GuardianHome';

const _renderPaymentSecurityItem = ({ item }: { item: ITransferLimitItem }) => {
  const { defaultToken } = useCommonNetworkInfo();
  const symbolImages = useSymbolImages();
  const networkType = useCurrentNetworkInfo();
  const { navigateTo: navigationTo } = useBaseContainer({
    entryName: PortkeyEntries.PAYMENT_SECURITY_HOME_ENTRY,
  });

  return (
    <Touchable
      onPress={() => {
        navigationTo<PaymentSecurityDetailProps>(PortkeyEntries.PAYMENT_SECURITY_DETAIL_ENTRY, {
          params: {
            transferLimitDetail: item,
          },
        });
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

const PaymentSecurityList = ({ containerId }: { containerId: string }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { list, isNext, next, init } = useTransferLimitList();

  useBaseContainer({
    entryName: PortkeyEntries.PAYMENT_SECURITY_HOME_ENTRY,
    onNewIntent: (intent: GuardiansApprovalIntent) => {
      console.log('PaymentSecurityList onNewIntent', intent);
      if (intent.result === 'success') {
        CommonToast.success('edit success');
      }
    },
    containerId,
    onShow: () => {
      setTimeout(() => {
        init();
      }, 100);
    },
  });

  const getList = useCallback(async () => {
    if (!isNext) return;
    setIsRefreshing(true);
    try {
      await next();
    } catch (error) {
      console.log('PaymentSecurityList: error', error);
      CommonToast.failError('Failed to fetch data');
    }
    setIsRefreshing(false);
  }, [isNext, next]);

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
