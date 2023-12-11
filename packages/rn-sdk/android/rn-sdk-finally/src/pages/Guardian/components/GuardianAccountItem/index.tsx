import { TextM, TextS } from '@portkey/rn-sdk/src/components/CommonText';
import React, { memo, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import { UserGuardianItem } from 'packages/types/store-ca/guardians/type';
import { LoginType } from '@portkey/rn-sdk/src/packages/types/types-ca/wallet';
import { PRIVATE_GUARDIAN_ACCOUNT } from '@portkey/rn-sdk/src/packages/constants/constants-ca/guardian';
import Svg from '@portkey/rn-sdk/src/components/Svg';
import { LoginGuardianTypeIcon } from '@portkey/rn-sdk/src/constants/misc';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import { FontStyles } from '@portkey/rn-sdk/src/assets/theme/styles';

type GuardianAccountItemProps = {
  guardian?: UserGuardianItem;
};

const GuardianAccountItem = ({ guardian }: GuardianAccountItemProps) => {
  const guardianAccount = useMemo(() => {
    if (!guardian) return '';
    if (![LoginType.Apple, LoginType.Google].includes(guardian.guardianType)) {
      return guardian.guardianAccount;
    }
    if (guardian.isPrivate) return PRIVATE_GUARDIAN_ACCOUNT;
    return guardian.thirdPartyEmail || '';
  }, [guardian]);

  const renderGuardianAccount = useCallback(() => {
    if (!guardian) return <></>;
    if (!guardian.firstName) {
      return (
        <TextM
          numberOfLines={[LoginType.Apple, LoginType.Google].includes(guardian.guardianType) ? 1 : 2}
          style={GStyles.flex1}>
          {guardianAccount}
        </TextM>
      );
    }
    return (
      <View style={GStyles.flex1}>
        <TextM style={styles.firstNameStyle} numberOfLines={1}>
          {guardian.firstName}
        </TextM>
        <TextS style={FontStyles.font3} numberOfLines={1}>
          {guardianAccount}
        </TextS>
      </View>
    );
  }, [guardianAccount, guardian]);

  return (
    <View style={styles.guardianTypeWrap}>
      {guardian && (
        <>
          <Svg iconStyle={styles.loginTypeIcon} icon={LoginGuardianTypeIcon[guardian.guardianType]} size={pTd(28)} />
          {renderGuardianAccount()}
        </>
      )}
    </View>
  );
};

export default memo(GuardianAccountItem);

const styles = StyleSheet.create({
  guardianTypeWrap: {
    height: pTd(56),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: pTd(6),
    backgroundColor: defaultColors.bg1,
    paddingHorizontal: pTd(16),
  },
  loginTypeIcon: {
    borderRadius: pTd(14),
    marginRight: pTd(12),
  },
  firstNameStyle: {
    marginBottom: pTd(2),
  },
});
