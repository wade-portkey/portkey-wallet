import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import OverlayModal from '@portkey/rn-sdk/src/components/OverlayModal';
import { FlatList, StyleSheet } from 'react-native';
import { ModalBody } from '@portkey/rn-sdk/src/components/ModalBody';
import CommonInput from '@portkey/rn-sdk/src/components/CommonInput';
import { TokenItemShowType } from '@portkey/rn-sdk/src/packages/types/types-eoa/token';
import { AccountType } from '@portkey/rn-sdk/src/packages/types/wallet';
import TokenListItem from '@portkey/rn-sdk/src/components/TokenListItem';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import fonts from '@portkey/rn-sdk/src/assets/theme/fonts';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import { useLanguage } from '@portkey/rn-sdk/src/i18n/hooks';
import useDebounce from '@portkey/rn-sdk/src/hooks/useDebounce';
import NoData from '@portkey/rn-sdk/src/components/NoData';
import { useGStyles } from '@portkey/rn-sdk/src/assets/theme/useGStyles';
import myEvents from '@portkey/rn-sdk/src/utils/deviceEvent';
import { getCachedAllChainInfo } from '@portkey/rn-sdk/src/model/chain';
import { useCommonNetworkInfo } from '@portkey/rn-sdk/src/components/TokenOverlay/hooks';
import { NetworkController } from '@portkey/rn-sdk/src/network/controller';
import { IUserTokenItem } from '@portkey/rn-sdk/src/network/dto/query';
import Loading from '@portkey/rn-sdk/src/components/Loading';
import { UnlockedWallet, getUnlockedWallet } from '@portkey/rn-sdk/src/model/wallet';
import useEffectOnce from '@portkey/rn-sdk/src/hooks/useEffectOnce';

type onFinishSelectTokenType = (tokenItem: TokenItemShowType) => void;
type TokenListProps = {
  account?: AccountType;
  onFinishSelectToken?: onFinishSelectTokenType;
};

const TokenList = ({ onFinishSelectToken }: TokenListProps) => {
  const { t } = useLanguage();
  const commonInfo = useCommonNetworkInfo();
  const chainIdList = useRef<string[] | undefined>(undefined);
  const [tokenDataShowInMarket, setTokenDataShowInMarket] = useState<IUserTokenItem[]>();
  const gStyles = useGStyles;
  const [wallet, setWallet] = useState<UnlockedWallet | null>(null);

  useEffectOnce(async () => {
    setWallet(await getUnlockedWallet({ getMultiCaAddresses: true }));
  });

  const [keyword, setKeyword] = useState('');

  const debounceKeyword = useDebounce(keyword, 800);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <TokenListItem
        noBalanceShow
        key={`${item.symbol}${item.chainId}`}
        item={item}
        onPress={async () => {
          if (!wallet) {
            throw new Error('wallet is not ready');
          }
          const { multiCaAddresses } = wallet;
          OverlayModal.hide();
          console.log('select token', item);
          const { chainId } = item.token;
          const caAddress = multiCaAddresses[chainId];
          item.currentNetwork = commonInfo.currentNetwork;
          item.currentCaAddress = caAddress;
          item.defaultToken = commonInfo.defaultToken;
          onFinishSelectToken?.(item);
        }}
        commonInfo={commonInfo}
      />
    ),
    [commonInfo, wallet, onFinishSelectToken],
  );

  useEffect(() => {
    Loading.show();
    async function fetchData() {
      if (chainIdList.current === undefined) {
        const chainInfo = await getCachedAllChainInfo();
        chainIdList.current = chainInfo.map(chainInfoItem => {
          return chainInfoItem.chainId;
        });
      }
      const tokenAssets = await NetworkController.searchTokenList({
        chainIdArray: chainIdList.current ?? 'AELF',
        keyword: debounceKeyword,
      });
      return tokenAssets?.items;
    }
    fetchData()
      .then(result => {
        result && setTokenDataShowInMarket(result);
      })
      .finally(() => {
        Loading.hide();
      });
  }, [debounceKeyword]);

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
