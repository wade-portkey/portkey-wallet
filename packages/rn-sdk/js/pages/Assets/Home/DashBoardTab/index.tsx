import React, { useMemo } from 'react';
import TokenSection from '../TokenSection';

import { useLanguage } from 'i18n/hooks';
import { RNTabView } from 'model/hooks/tabs';
import { View } from 'react-native';

export enum DashBoardTabEnum {
  TOKENS = 'tokens',
  NFTS = 'nfts',
}

const DashBoardTab: React.FC = () => {
  const { t } = useLanguage();
  const DashBoardTabConfig = useMemo(() => {
    return [
      {
        key: DashBoardTabEnum.TOKENS,
        title: t('Tokens'),
        component: TokenSection,
      },
      {
        key: DashBoardTabEnum.NFTS,
        title: t('NFTs'),
        component: () => <View />,
      },
    ];
  }, [t]);
  return <RNTabView tabs={DashBoardTabConfig} defaultTab={DashBoardTabEnum.TOKENS} />;
};

export default DashBoardTab;
