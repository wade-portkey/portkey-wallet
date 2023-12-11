import { bottomBarHeight } from '@portkey/rn-sdk/src/packages/utils/mobile/device';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pageWrap: {
    backgroundColor: defaultColors.bg1,
    width: '100%',
    height: '100%',
  },
  pageSafeBottom: {
    paddingBottom: bottomBarHeight || 25,
  },
});

export default styles;
