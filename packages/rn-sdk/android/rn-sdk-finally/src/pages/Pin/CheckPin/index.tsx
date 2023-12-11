import React, { useCallback, useRef, useState } from 'react';
import PageContainer from '@portkey/rn-sdk/src/components/PageContainer';
import { DigitInputInterface } from '@portkey/rn-sdk/src/components/DigitInput';
import { PIN_SIZE } from '@portkey/rn-sdk/src/packages/constants/misc';
import PinContainer from '@portkey/rn-sdk/src/components/PinContainer';
import { StyleSheet } from 'react-native';
import { PinErrorMessage } from '@portkey/rn-sdk/src/packages/utils/wallet/types';
import useBaseContainer from '@portkey/rn-sdk/src/model/container/UseBaseContainer';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import { checkPin, getUseBiometric, unLockTempWallet } from '@portkey/rn-sdk/src/model/verify/core';
import { touchAuth } from '@portkey/rn-sdk/src/pages/Pin/SetBiometrics';
import Loading from '@portkey/rn-sdk/src/components/Loading';
import useEffectOnce from '@portkey/rn-sdk/src/hooks/useEffectOnce';
import myEvents from '@portkey/rn-sdk/src/utils/deviceEvent';
import { UnlockedWallet, getUnlockedWallet } from '@portkey/rn-sdk/src/model/wallet';

export default function CheckPin(props: CheckPinProps) {
  const { targetScene, openBiometrics } = props;
  const [errorMessage, setErrorMessage] = useState<string>();
  const pinRef = useRef<DigitInputInterface>();
  const [canUseBiometrics, setCanUseBiometrics] = useState(false);
  const { onFinish, navigateTo: navigationTo } = useBaseContainer({
    entryName: PortkeyEntries.CHECK_PIN,
  });

  const onChangeText = useCallback(
    async (pin: string) => {
      if (pin.length === PIN_SIZE) {
        if (!(await checkPin(pin))) {
          pinRef.current?.reset();
          return setErrorMessage(PinErrorMessage.invalidPin);
        }
        if (targetScene === 'changePin') {
          navigationTo(PortkeyEntries.SET_PIN, {
            params: {
              oldPin: pin,
            },
          });
          return;
        }
        Loading.show();
        myEvents.openBiometrics.emit(pin);
        unLockTempWallet(pin).then(async () => {
          Loading.hide();
          const walletInfo = await getUnlockedWallet();
          onFinish<CheckPinResult>({
            status: 'success',
            data: {
              pin,
              walletInfo,
            },
          });
        });
      } else if (errorMessage) {
        setErrorMessage(undefined);
      }
    },
    [errorMessage, navigationTo, onFinish, targetScene],
  );

  const handleBiometrics = async () => {
    const res = await touchAuth();
    if (res?.success) {
      Loading.show();
      await unLockTempWallet('use-bio', true);
      const walletInfo = await getUnlockedWallet();
      Loading.hide();
      onFinish<CheckPinResult>({
        status: 'success',
        data: {
          pin: 'FAKE',
          walletInfo,
        },
      });
    } else {
      setErrorMessage('Biometrics failed');
    }
  };

  useEffectOnce(() => {
    if (openBiometrics || targetScene === 'changePin') {
      // from Biometric op switch page, or from changePin Scene. do not need Biometrics op button
      return;
    }
    getUseBiometric().then(res => {
      setCanUseBiometrics(res);
      if (res) {
        handleBiometrics();
      }
    });
  });

  return (
    <PageContainer
      titleDom
      type="leftBack"
      backTitle={'back'}
      containerStyles={styles.container}
      leftCallback={() => {
        onFinish<CheckPinResult>({
          status: 'cancel',
          data: { pin: '' },
        });
      }}
      scrollViewProps={{ disabled: true }}>
      <PinContainer
        showHeader
        ref={pinRef}
        title="Enter Pin"
        errorMessage={errorMessage}
        onChangeText={onChangeText}
        isBiometrics={canUseBiometrics}
        onBiometricsPress={handleBiometrics}
      />
    </PageContainer>
  );
}

export interface CheckPinProps {
  rootTag?: any;
  targetScene: 'changePin';
  openBiometrics?: boolean;
}

export interface CheckPinResult {
  pin: string;
  walletInfo?: UnlockedWallet;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
