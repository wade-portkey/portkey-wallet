import React, { useCallback, useMemo, useState } from 'react';
import PageContainer from '@portkey/rn-sdk/src/components/PageContainer';
import { StyleSheet, View } from 'react-native';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';

import CommonButton from '@portkey/rn-sdk/src/components/CommonButton';
import { TextM } from '@portkey/rn-sdk/src/components/CommonText';
import { FontStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import { divDecimalsToShow } from '@portkey/rn-sdk/src/packages/utils/converter';
import { ITransferLimitItem } from '@portkey/rn-sdk/src/model/security';
import { callGetTransferLimitMethod } from '@portkey/rn-sdk/src/model/contract/handler';
import Loading from '@portkey/rn-sdk/src/components/Loading';
import useBaseContainer from '@portkey/rn-sdk/src/model/container/UseBaseContainer';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import { PaymentSecurityEditProps } from '@portkey/rn-sdk/src/pages/My/WalletSecurity/PaymentSecurity/PaymentSecurityEdit';

export interface PaymentSecurityDetailProps {
  transferLimitDetail?: ITransferLimitItem;
  containerId?: string;
}

const PaymentSecurityDetail: React.FC = (props: PaymentSecurityDetailProps) => {
  const { transferLimitDetail, containerId } = props;
  const [detail, setDetail] = useState<ITransferLimitItem | undefined>(transferLimitDetail);
  const { navigateTo } = useBaseContainer({
    entryName: PortkeyEntries.PAYMENT_SECURITY_DETAIL_ENTRY,
    onShow: () => {
      getDetail();
    },
    containerId,
  });
  const getDetail = useCallback(async () => {
    if (!transferLimitDetail) return;
    Loading.show();
    const { symbol, chainId } = transferLimitDetail;
    try {
      const result = await callGetTransferLimitMethod(chainId, symbol);
      if (result?.data) {
        setDetail(pre => {
          if (pre) {
            return {
              ...pre,
              ...result?.data,
            };
          }
          return pre;
        });
      }
    } catch (error) {
      console.log('PaymentSecurityDetail: getTransferLimit error', error);
    }
    Loading.hide();
  }, [transferLimitDetail]);

  const detailFormatted = useMemo(() => {
    if (!detail) return undefined;
    return {
      ...detail,
      singleLimit: divDecimalsToShow(detail.singleLimit, detail.decimals),
      dailyLimit: divDecimalsToShow(detail.dailyLimit, detail.decimals),
    };
  }, [detail]);

  return (
    <PageContainer
      titleDom={'Transfer Settings'}
      safeAreaColor={['blue', 'gray']}
      containerStyles={pageStyles.pageWrap}
      scrollViewProps={{ disabled: true }}>
      <View>
        {detailFormatted?.restricted ? (
          <>
            <View style={pageStyles.labelWrap}>
              <TextM>Limit per Transaction</TextM>
              <TextM style={FontStyles.font3}>{`${detailFormatted?.singleLimit || ''} ${
                detailFormatted?.symbol || ''
              }`}</TextM>
            </View>
            <View style={pageStyles.labelWrap}>
              <TextM>Daily Limit</TextM>
              <TextM style={FontStyles.font3}>{`${detailFormatted?.dailyLimit || ''} ${
                detailFormatted?.symbol || ''
              }`}</TextM>
            </View>
            <TextM style={FontStyles.font3}>
              {
                'Transfers exceeding the limits cannot be conducted unless you modify the limit settings first, which needs guardian approval.'
              }
            </TextM>
          </>
        ) : (
          <>
            <View style={pageStyles.labelWrap}>
              <TextM>Transfer Settings</TextM>
              <TextM style={FontStyles.font3}>Off</TextM>
            </View>
            <TextM style={FontStyles.font3}>{'No limit for transfer'}</TextM>
          </>
        )}
      </View>
      <CommonButton
        type="solid"
        onPress={() => {
          navigateTo<PaymentSecurityEditProps>(PortkeyEntries.PAYMENT_SECURITY_EDIT_ENTRY, {
            params: {
              transferLimitDetail: detail,
            },
          });
        }}>
        Edit
      </CommonButton>
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
  labelWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: pTd(16),
    backgroundColor: defaultColors.bg1,
    marginBottom: pTd(24),
    height: pTd(56),
    alignItems: 'center',
    borderRadius: pTd(6),
  },
});

export default PaymentSecurityDetail;
