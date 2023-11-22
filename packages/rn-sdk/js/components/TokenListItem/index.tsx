import { divDecimals, formatAmountShow } from '@portkey-wallet/utils/converter';
import { defaultColors } from 'assets/theme';
import { FontStyles } from 'assets/theme/styles';
import CommonAvatar from 'components/CommonAvatar';
import { TextL, TextS } from 'components/CommonText';
import { useWallet } from '@portkey-wallet/hooks/hooks-ca/wallet';
import React, { memo, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { formatChainInfoToShow } from '@portkey-wallet/utils';
import { pTd } from 'utils/unit';
// import { useIsTestnet } from '@portkey-wallet/hooks/hooks-ca/network';
import { useGetCurrentAccountTokenPrice, useIsTokenHasPrice } from '@portkey-wallet/hooks/hooks-ca/useTokensPrice';
import { useDefaultToken } from '@portkey-wallet/hooks/hooks-ca/chainList';
import { getCurrentNetwork } from 'utils/commonUtil';
import { NetworkType } from '@portkey-wallet/types';
import useEffectOnce from 'hooks/useEffectOnce';
import { Token, getCachedNetworkConfig } from 'model/chain';
import { DEFAULT_TOKEN } from '@portkey-wallet/constants/constants-ca/wallet';
import { useSymbolImages } from './hook';
interface TokenListItemType {
  noBalanceShow?: boolean;
  item?: any;
  onPress?: (item: any) => void;
}

const TokenListItem: React.FC<TokenListItemType> = props => {
  const { noBalanceShow = false, onPress, item } = props;
  const [currentNetwork, setCurrentNetwork] = useState<NetworkType>('MAIN');
  const [defaultToken, setDefaultToken] = useState<Token>(DEFAULT_TOKEN);
  useEffectOnce(async () => {
    setCurrentNetwork(await getCurrentNetwork());
    const { defaultToken: cachedDefaultToken } = await getCachedNetworkConfig();
    setDefaultToken(cachedDefaultToken);
    console.log('cachedDefaultToken', cachedDefaultToken);
  });
  const symbolImages = useSymbolImages();

  // const [tokenPriceObject] = useGetCurrentAccountTokenPrice();
  // const isTokenHasPrice = useIsTokenHasPrice(item?.symbol);
  const isTokenHasPrice = true;
  const tokenPriceObject: never[] = [];

  return (
    <TouchableOpacity style={itemStyle.wrap} onPress={() => onPress?.(item)}>
      <CommonAvatar
        hasBorder
        style={itemStyle.left}
        title={item?.token?.symbol}
        avatarSize={pTd(48)}
        // elf token icon is fixed , only use white background color
        svgName={item?.token?.symbol === defaultToken.symbol ? 'testnet' : undefined}
        imageUrl={symbolImages[item?.token?.symbol]}
      />
      <View style={itemStyle.right}>
        <View style={itemStyle.infoWrap}>
          <TextL numberOfLines={1} ellipsizeMode={'tail'} style={itemStyle.tokenName}>
            {item?.token?.symbol}
          </TextL>
          <TextS numberOfLines={1} style={[FontStyles.font3, itemStyle.chainInfo]}>
            {formatChainInfoToShow(item?.chainId, currentNetwork)}
          </TextS>
        </View>

        {!noBalanceShow && (
          <View style={itemStyle.balanceWrap}>
            <TextL style={itemStyle.token} numberOfLines={1} ellipsizeMode={'tail'}>
              {formatAmountShow(divDecimals(item?.balance, item.decimals))}
            </TextL>
            <TextS numberOfLines={1} ellipsizeMode={'tail'} style={itemStyle.dollar}>
              {!(currentNetwork === 'TESTNET') &&
                isTokenHasPrice &&
                `$ ${formatAmountShow(
                  divDecimals(item?.balance, item.decimals).multipliedBy(tokenPriceObject[item?.symbol]),
                  2,
                )}`}
            </TextS>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(TokenListItem);

const itemStyle = StyleSheet.create({
  wrap: {
    height: pTd(72),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    marginLeft: pTd(16),
  },
  right: {
    height: pTd(72),
    marginLeft: pTd(16),
    paddingRight: pTd(16),
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: defaultColors.border6,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  infoWrap: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  tokenName: {
    lineHeight: pTd(22),
  },
  chainInfo: {
    lineHeight: pTd(16),
    marginTop: pTd(2),
    width: pTd(150),
  },
  balanceWrap: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  token: {
    color: defaultColors.font5,
    lineHeight: pTd(22),
    overflow: 'hidden',
  },
  dollar: {
    marginTop: pTd(2),
    lineHeight: pTd(16),
    color: defaultColors.font7,
  },
});
