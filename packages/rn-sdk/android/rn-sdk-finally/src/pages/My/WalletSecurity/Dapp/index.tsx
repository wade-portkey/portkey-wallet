import React from 'react';
import PageContainer from '@portkey/rn-sdk/src/components/PageContainer';
import { StyleSheet } from 'react-native';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import { useCurrentDappList } from '@portkey/rn-sdk/src/packages/hooks/hooks-ca/dapp';
import NoData from '@portkey/rn-sdk/src/components/NoData';
import navigationService from 'utils/navigationService';
import DappListItem from '@portkey/rn-sdk/src/pages/My/WalletSecurity/Dapp/components/DappListItem';

const DappList: React.FC = () => {
  const dappList = useCurrentDappList();

  return (
    <PageContainer
      titleDom={'Connected Sites'}
      safeAreaColor={['blue', 'gray']}
      containerStyles={pageStyles.pageWrap}
      scrollViewProps={{ disabled: false }}>
      {dappList?.map(item => (
        <DappListItem
          isShowArrow
          key={item.origin}
          item={item}
          onPress={() => navigationService.navigate('DappDetail', { origin: item.origin })}
        />
      ))}
      {(dappList ?? []).length === 0 && <NoData style={pageStyles.noData} message="No Connected Sites" />}
    </PageContainer>
  );
};

const pageStyles = StyleSheet.create({
  pageWrap: {
    backgroundColor: defaultColors.bg4,
    ...GStyles.paddingArg(24, 20, 18),
  },
  tipsWrap: {
    lineHeight: pTd(20),
    marginBottom: pTd(24),
  },
  noData: {
    backgroundColor: defaultColors.bg4,
  },
});

export default DappList;
