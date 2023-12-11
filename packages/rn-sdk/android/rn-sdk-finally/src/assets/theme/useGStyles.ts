import { windowHeight } from '@portkey/rn-sdk/src/packages/utils/mobile/device';
import { isIOS } from '@portkey/rn-sdk/src/packages/utils/mobile/device';
import { makeStyles } from '@rneui/themed';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import gSTyles from '@portkey/rn-sdk/src/assets/theme/GStyles';

export const useGStyles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    ...gSTyles.paddingArg(0, 16),
  },
  pwTip: {
    marginTop: 3,
    color: 'white',
  },
  safeAreaContainer: {
    paddingBottom: !isIOS ? 20 : undefined,
  },
  overlayStyle: {
    height: windowHeight - pTd(isIOS ? 68 : 100),
  },
};
