import React, { useState, useCallback, useEffect, useMemo } from 'react';
import OverlayModal from 'components/OverlayModal';
import { FlatList, StyleSheet } from 'react-native';
import { ModalBody } from 'components/ModalBody';
import CommonInput from 'components/CommonInput';
import { TokenItemShowType } from '@portkey-wallet/types/types-eoa/token';
import { AccountType } from '@portkey-wallet/types/wallet';
import TokenListItem from 'components/TokenListItem';
import { defaultColors } from 'assets/theme';
import fonts from 'assets/theme/fonts';
import { pTd } from 'utils/unit';
import { useLanguage } from 'i18n/hooks';
// import { useAppCommonDispatch } from '@portkey-wallet/hooks';
import useDebounce from 'hooks/useDebounce';
// import useEffectOnce from 'hooks/useEffectOnce';
// import { useChainIdList } from '@portkey-wallet/hooks/hooks-ca/wallet';
// import { fetchAllTokenListAsync } from '@portkey-wallet/store/store-ca/tokenManagement/action';
import NoData from 'components/NoData';
import { useGStyles } from 'assets/theme/useGStyles';
import myEvents from '../../utils/deviceEvent';
import { MOCK_DATA } from './data';
import useEffectOnce from 'hooks/useEffectOnce';
import { getCachedAllChainInfo } from 'model/chain';

type onFinishSelectTokenType = (tokenItem: TokenItemShowType) => void;
type TokenListProps = {
  account?: AccountType;
  onFinishSelectToken?: onFinishSelectTokenType;
};

const TokenList = ({ onFinishSelectToken }: TokenListProps) => {
  const { t } = useLanguage();
  const [chainIdList, setChainIdList] = useState<string[]>(['AELF']);
  const { tokenDataShowInMarket } = MOCK_DATA;
  // const dispatch = useAppCommonDispatch();
  // const chainIdList = useChainIdList();
  useEffectOnce(() => {
    getCachedAllChainInfo().then(chainInfo => {
      const localChainIdList = chainInfo.map(chainInfoItem => {
        return chainInfoItem.chainId;
      });
      setChainIdList(localChainIdList);
    });
  });
  const gStyles = useGStyles;

  const [keyword, setKeyword] = useState('');

  const debounceKeyword = useDebounce(keyword, 800);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <TokenListItem
        noBalanceShow
        key={`${item.symbol}${item.chainId}`}
        item={item}
        onPress={() => {
          OverlayModal.hide();
          onFinishSelectToken?.(item);
        }}
      />
    ),
    [onFinishSelectToken],
  );

  // useEffect(() => {
  //   dispatch(fetchAllTokenListAsync({ chainIdArray: chainIdList, keyword: debounceKeyword }));
  // }, [chainIdList, debounceKeyword, dispatch]);

  // useEffectOnce(() => {
  //   if (tokenDataShowInMarket.length !== 0) return;
  //   dispatch(fetchAllTokenListAsync({ chainIdArray: chainIdList, keyword: debounceKeyword }));
  // });

  const noData = useMemo(() => {
    return debounceKeyword ? <NoData noPic message={t('There is no search result.')} /> : null;
  }, [debounceKeyword, t]);

  return (
    <ModalBody modalBodyType="bottom" title={t('Select Token')} style={gStyles.overlayStyle}>
      <CommonInput
        placeholder={t('Token Name')}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        value={keyword}
        onChangeText={v => {
          setKeyword(v.trim());
        }}
      />
      <FlatList
        onLayout={e => {
          myEvents.nestScrollViewLayout.emit(e.nativeEvent.layout);
        }}
        disableScrollViewPanResponder={true}
        style={styles.flatList}
        onScroll={({ nativeEvent }) => {
          const {
            contentOffset: { y: scrollY },
          } = nativeEvent;
          if (scrollY <= 0) {
            myEvents.nestScrollViewScrolledTop.emit();
          }
        }}
        data={tokenDataShowInMarket || []}
        renderItem={renderItem}
        ListEmptyComponent={noData}
        keyExtractor={(item: any) => item.id || ''}
      />
    </ModalBody>
  );
};

export const showTokenList = (props: TokenListProps) => {
  OverlayModal.show(<TokenList {...props} />, {
    position: 'bottom',
    enabledNestScrollView: true,
  });
};

export default {
  showTokenList,
};

export const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: defaultColors.font5,
    height: pTd(22),
    lineHeight: pTd(22),
    marginTop: pTd(17),
    marginBottom: pTd(16),
    ...fonts.mediumFont,
  },
  containerStyle: {
    marginLeft: pTd(16),
    width: pTd(343),
    marginBottom: pTd(8),
  },
  inputContainerStyle: {
    height: pTd(44),
  },
  inputStyle: {
    height: pTd(44),
  },
  flatList: {
    marginTop: pTd(8),
  },
});
