import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import { TextM } from '@portkey/rn-sdk/src/components/CommonText';
import { FontStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import Touchable from '@portkey/rn-sdk/src/components/Touchable';
import { getHost } from '@portkey/rn-sdk/src/packages/utils/dapp/browser';
import DiscoverWebsiteImage from 'pages/Discover/components/DiscoverWebsiteImage';
import TextWithProtocolIcon from 'components/TextWithProtocolIcon';
import Svg from '@portkey/rn-sdk/src/components/Svg';
import { DappStoreItem } from '@portkey/rn-sdk/src/packages/store/store-ca/dapp/type';
import { useGetCmsWebsiteInfo } from '@portkey/rn-sdk/src/packages/hooks/hooks-ca/cms';

interface DappListItemProps {
  type?: 'home' | 'detail';
  item?: DappStoreItem;
  onPress?: (item?: DappStoreItem) => void;
}

const DappListItem: React.FC<DappListItemProps> = ({ item, type = 'home', onPress }) => {
  const { getCmsWebsiteInfoImageUrl, getCmsWebsiteInfoName } = useGetCmsWebsiteInfo();

  if (type === 'detail') {
    return (
      <View key={item?.name} style={itemStyles.itemWrap}>
        <DiscoverWebsiteImage
          size={pTd(32)}
          imageUrl={getCmsWebsiteInfoImageUrl(item?.origin || '')}
          style={itemStyles.itemImage}
        />
        <View style={itemStyles.itemCenter}>
          <TextWithProtocolIcon
            textFontSize={pTd(16)}
            title={getCmsWebsiteInfoName(item?.origin || '') || item?.name || getHost(item?.origin || '')}
            url={item?.origin || ''}
          />
          <TouchableOpacity onPress={() => onPress?.(item)}>
            <TextM numberOfLines={1} style={[FontStyles.font4, itemStyles.itemDappUrl]}>
              {item?.origin}
            </TextM>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <Touchable key={item?.name} style={itemStyles.itemWrap} onPress={() => onPress?.(item)}>
      <DiscoverWebsiteImage
        size={pTd(32)}
        imageUrl={getCmsWebsiteInfoImageUrl(item?.origin || '')}
        style={itemStyles.itemImage}
      />
      <View style={itemStyles.itemCenter}>
        <TextWithProtocolIcon
          textFontSize={pTd(16)}
          title={getCmsWebsiteInfoName(item?.origin || '') || item?.name || getHost(item?.origin || '')}
          url={item?.origin || ''}
        />
        <TextM numberOfLines={1} style={[FontStyles.font7, itemStyles.itemDappUrl]}>
          {item?.origin}
        </TextM>
      </View>
      <Svg icon="right-arrow" size={pTd(20)} />
    </Touchable>
  );
};

export default DappListItem;

const itemStyles = StyleSheet.create({
  itemWrap: {
    width: '100%',
    height: pTd(72),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...GStyles.paddingArg(13, 16),
    backgroundColor: defaultColors.bg1,
    marginBottom: pTd(24),
    borderRadius: pTd(6),
  },
  itemImage: {
    marginRight: pTd(16),
    borderRadius: pTd(16),
  },
  itemCenter: {
    flex: 1,
    paddingRight: pTd(16),
  },
  itemDappTitle: {
    marginBottom: pTd(1),
  },
  itemDappUrl: {
    marginTop: pTd(1),
  },
  itemRight: {
    width: pTd(85),
    height: pTd(24),
    borderWidth: pTd(1),
    borderColor: defaultColors.font12,
    color: defaultColors.font12,
    textAlign: 'center',
    lineHeight: pTd(22),
    borderRadius: pTd(6),
  },
});
