import React from 'react';
import AssetsHome from '@portkey/rn-sdk/src/pages/Assets/Home/AssetsHome';
import DashBoardTab from '@portkey/rn-sdk/src/pages/Assets/Home/DashBoardTab';
import SafeAreaBox from '@portkey/rn-sdk/src/components/SafeAreaBox';
import { BGStyles } from '@portkey/rn-sdk/src/assets/theme/styles';

const DashBoard: React.FC = () => {
  return (
    <SafeAreaBox edges={['top', 'right', 'left']} style={[BGStyles.bg5]}>
      <AssetsHome />
      <DashBoardTab />
    </SafeAreaBox>
  );
};

export default DashBoard;
