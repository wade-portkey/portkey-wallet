import React, { useMemo } from 'react';
import PageContainer from '@portkey/rn-sdk/src/components/PageContainer';
import { StyleSheet, View } from 'react-native';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import { useCurrentWalletInfo } from '@portkey/rn-sdk/src/packages/hooks/hooks-ca/wallet';
import DeviceItem from '@portkey/rn-sdk/src/pages/My/WalletSecurity/Device/components/DeviceItem';
import useRouterParams from '@portkey/rn-sdk/src/packages/hooks/useRouterParams';
import { DeviceItemType } from '@portkey/rn-sdk/src/packages/types/types-ca/device';
import CommonButton from '@portkey/rn-sdk/src/components/CommonButton';
import navigationService from 'utils/navigationService';
import { ApprovalType } from '@portkey/rn-sdk/src/packages/types/verifier';
import { TextM } from '@portkey/rn-sdk/src/components/CommonText';
import { FontStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';

interface RouterParams {
  deviceItem?: DeviceItemType;
}

const DeviceDetail: React.FC = () => {
  const { deviceItem } = useRouterParams<RouterParams>();
  const walletInfo = useCurrentWalletInfo();
  const isCurrent = useMemo(
    () => deviceItem && walletInfo.address === deviceItem.managerAddress,
    [deviceItem, walletInfo.address],
  );

  return (
    <PageContainer
      titleDom={'Devices Details'}
      safeAreaColor={['blue', 'gray']}
      containerStyles={pageStyles.pageWrap}
      scrollViewProps={{ disabled: true }}>
      <View>
        {deviceItem && <DeviceItem deviceItem={deviceItem} isCurrent={isCurrent} isShowArrow={false} />}
        {!isCurrent && (
          <TextM style={[FontStyles.font3, pageStyles.tipsWrap]}>
            {`Your account is logged in on this device and you can remove it to revoke its access to your account.
Please note that after removing this device, you will need to verify your identity through your guardians when you log in again.`}
          </TextM>
        )}
      </View>
      {!isCurrent && (
        <CommonButton
          type="clear"
          titleStyle={pageStyles.deleteBtnTitle}
          onPress={() => {
            if (!deviceItem?.managerAddress) return;
            navigationService.navigate('GuardianApproval', {
              approvalType: ApprovalType.removeOtherManager,
              removeManagerAddress: deviceItem?.managerAddress,
            });
          }}>
          Remove Device
        </CommonButton>
      )}
    </PageContainer>
  );
};

const pageStyles = StyleSheet.create({
  pageWrap: {
    flex: 1,
    backgroundColor: defaultColors.bg4,
    justifyContent: 'space-between',
    ...GStyles.paddingArg(24, 20, 18),
  },
  tipsWrap: {
    lineHeight: pTd(20),
  },
  deleteBtnTitle: {
    color: defaultColors.font12,
  },
});

export default DeviceDetail;
