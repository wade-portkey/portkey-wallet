import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import { StyleSheet } from 'react-native';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';

const styles = StyleSheet.create({
  itemRow: {
    height: pTd(72),
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: defaultColors.border6,
    height: pTd(72),
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    position: 'absolute',
    right: 26,
  },
  typeOverlayTitleLabel: {
    marginTop: pTd(16),
    marginBottom: pTd(8),
    textAlign: 'center',
  },
  leftIcon: {
    borderRadius: pTd(14),
    marginRight: pTd(16),
  },
});

export default styles;
