import { PIN_SIZE } from '@portkey/rn-sdk/src/packages/constants/misc';
import PageContainer from '@portkey/rn-sdk/src/components/PageContainer';
import { DigitInputInterface } from '@portkey/rn-sdk/src/components/DigitInput';
import React, { useCallback, useRef, useState } from 'react';
import myEvents from '@portkey/rn-sdk/src/utils/deviceEvent';
import PinContainer from '@portkey/rn-sdk/src/components/PinContainer';
import { StyleSheet } from 'react-native';
import useBaseContainer from '@portkey/rn-sdk/src/model/container/UseBaseContainer';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import { changePin, getVerifiedAndLockWallet } from '@portkey/rn-sdk/src/model/verify/core';
import Loading from '@portkey/rn-sdk/src/components/Loading';
import { SetBiometricsProps, SetBiometricsResult, touchAuth } from '@portkey/rn-sdk/src/pages/Pin/SetBiometrics';
import CommonToast from '@portkey/rn-sdk/src/components/CommonToast';
import { authenticateBioReady, isBiometricsCanUse } from '@portkey/rn-sdk/src/service/biometric';

export default function ConfirmPin({ oldPin, pin, deliveredSetPinInfo }: ConfirmPinPageProps) {
  const [errorMessage, setErrorMessage] = useState<string>();
  const pinRef = useRef<DigitInputInterface>();

  const { onFinish, navigateForResult } = useBaseContainer({
    entryName: PortkeyEntries.CONFIRM_PIN,
  });
  const onChangePin = useCallback(
    async (newPin: string) => {
      if (!oldPin) return;
      try {
        const canUse = isBiometricsCanUse();
        const biometricsReady = authenticateBioReady();
        if (await canUse) {
          if (await biometricsReady) {
            const res = await touchAuth();
            if (!res?.success) {
              CommonToast.failError('Failed To Verify');
              return;
            }
          }
          changePin(newPin);
        } else {
          changePin(newPin);
        }
        navigateForResult(PortkeyEntries.ACCOUNT_SETTING_ENTRY, { params: { modified: true } });
      } catch (error) {
        CommonToast.failError(error);
      }
    },
    [navigateForResult, oldPin],
  );
  const onSetPinSuccess = useCallback(
    async (confirmPin: string) => {
      const biometricsReady = await authenticateBioReady();
      if (biometricsReady) {
        navigateForResult<SetBiometricsResult, SetBiometricsProps>(
          PortkeyEntries.SET_BIO,
          {
            params: {
              pin: confirmPin,
              deliveredSetPinInfo,
            },
          },
          async result => {
            if (result?.status === 'success') {
              onFinish({
                status: 'success',
                data: {
                  finished: true,
                },
              });
            } else {
              setErrorMessage('Failed to set biometrics');
              pinRef.current?.reset();
            }
          },
        );
      } else {
        Loading.show();
        const res = await getVerifiedAndLockWallet(deliveredSetPinInfo, confirmPin);
        Loading.hide();
        if (res) {
          onFinish({
            status: 'success',
            data: {
              finished: true,
            },
          });
        } else {
          setErrorMessage('network failure');
          pinRef.current?.reset();
        }
      }
    },
    [deliveredSetPinInfo, navigateForResult, onFinish],
  );

  const onChangeText = useCallback(
    async (confirmPin: string) => {
      if (confirmPin.length !== PIN_SIZE) {
        if (errorMessage) setErrorMessage(undefined);
        return;
      }

      if (confirmPin !== pin) {
        pinRef.current?.reset();
        return setErrorMessage('Pins do not match');
      }

      if (oldPin) return onChangePin(confirmPin);
      return onSetPinSuccess(confirmPin);
    },
    [pin, oldPin, onChangePin, onSetPinSuccess, errorMessage],
  );
  return (
    <PageContainer
      titleDom
      type="leftBack"
      backTitle={oldPin ? 'Change Pin' : undefined}
      onGestureStartCallback={() => {
        myEvents.clearSetPin.emit('clearSetPin');
      }}
      leftCallback={() => {
        pinRef.current?.reset();
        onFinish({
          status: 'cancel',
          data: {
            finished: false,
          },
        });
      }}
      containerStyles={styles.container}
      scrollViewProps={{ disabled: true }}>
      <PinContainer
        showHeader
        ref={pinRef}
        title="Confirm Pin"
        errorMessage={errorMessage}
        onChangeText={onChangeText}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export interface ConfirmPinPageProps {
  oldPin?: string;
  pin: string;
  deliveredSetPinInfo: string; // SetPinInfo
}
