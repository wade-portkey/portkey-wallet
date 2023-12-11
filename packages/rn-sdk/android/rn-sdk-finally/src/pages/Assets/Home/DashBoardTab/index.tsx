import React, { useMemo } from 'react';
import TokenSection from '@portkey/rn-sdk/src/pages/Assets/Home/TokenSection';
import NFTSection from '@portkey/rn-sdk/src/pages/Assets/Home/NFTSection';
import { useLanguage } from '@portkey/rn-sdk/src/i18n/hooks';
import { RNTabView } from '@portkey/rn-sdk/src/model/hooks/tabs';

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
        component: NFTSection,
      },
    ];
  }, [t]);
  return <RNTabView tabs={DashBoardTabConfig} defaultTab={DashBoardTabEnum.TOKENS} />;
};

export default DashBoardTab;
