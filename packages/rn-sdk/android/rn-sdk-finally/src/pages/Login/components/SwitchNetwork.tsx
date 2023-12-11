import { useContext } from 'react';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import { FontStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import { TextM } from '@portkey/rn-sdk/src/components/CommonText';
import NetworkOverlay from '@portkey/rn-sdk/src/components/NetworkOverlay';
import Svg from '@portkey/rn-sdk/src/components/Svg';
import Touchable from '@portkey/rn-sdk/src/components/Touchable';
import React from 'react';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import styles from '@portkey/rn-sdk/src/pages/Login/styles';
import NetworkContext from '@portkey/rn-sdk/src/pages/Login/context/NetworkContext';

export default function SwitchNetwork() {
  const networkContext = useContext(NetworkContext);
  return (
    <Touchable
      onPress={() =>
        NetworkOverlay.showSwitchNetwork({
          currentNetwork: networkContext.currentNetwork,
          changeCurrentNetwork: networkContext.changeCurrentNetwork,
        })
      }
      style={[GStyles.flexRowWrap, GStyles.itemCenter, styles.networkRow]}>
      <TextM style={[FontStyles.font11, styles.networkTip]}>{networkContext.currentNetwork?.name}</TextM>
      <Svg size={pTd(16)} icon="down-arrow" color={FontStyles.font11.color} />
    </Touchable>
  );
}
