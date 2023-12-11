import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react';
import { View, Image } from 'react-native';
import { BGStyles, FontStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import myEvents from '@portkey/rn-sdk/src/utils/deviceEvent';
import styles from '@portkey/rn-sdk/src/pages/Login/styles';
import Touchable from '@portkey/rn-sdk/src/components/Touchable';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import { TextS, TextXXXL } from '@portkey/rn-sdk/src/components/CommonText';
import { PageLoginType } from '@portkey/rn-sdk/src/pages/Login/types';
import { useIntervalQueryCAInfoByAddress } from '@portkey/rn-sdk/src/hooks/useIntervalQueryCAInfoByAddress';
import { LoginQRData } from '@portkey/rn-sdk/src/packages/types/types-ca/qrcode';
import { useGetDeviceInfo } from '@portkey/rn-sdk/src/hooks/device';
import { DEVICE_INFO_VERSION } from '@portkey/rn-sdk/src/packages/constants/constants-ca/device';
import CommonQRCodeStyled from '@portkey/rn-sdk/src/components/CommonQRCodeStyled';
import { usePreventScreenCapture } from 'expo-screen-capture';
import NetworkContext from '@portkey/rn-sdk/src/pages/Login/context/NetworkContext';
import useBaseContainer from '@portkey/rn-sdk/src/model/container/UseBaseContainer';
import { SetPinPageResult, SetPinPageProps } from '@portkey/rn-sdk/src/pages/Pin/SetPin';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import { AfterVerifiedConfig } from '@portkey/rn-sdk/src/model/verify/core';
import { AElfWeb3SDK, ManagerInfo } from '@portkey/rn-sdk/src/network/dto/wallet';
import { isIOS } from '@portkey/rn-sdk/src/packages/utils/mobile/device';

// When wallet does not exist, DEFAULT_WALLET is populated as the default data
const DEFAULT_WALLET: LoginQRData = {
  chainType: 'aelf',
  type: 'login',
  address: '2Aj8aTMsmgp1YyrVeCvB2dp9DbrLz5zgmAVmKNXsLnxhqzA69L',
  netWorkType: 'TESTNET',
  extraData: {
    deviceInfo: {
      deviceType: 2,
      deviceName: 'iOS',
    },
    version: '1.0.0',
  },
};

export default function QRCode({ setLoginType }: { setLoginType: (type: PageLoginType) => void }) {
  const [newWallet, setNewWallet] = useState<ManagerInfo>();
  const networkContext = useContext(NetworkContext);
  const currentNetwork = useMemo(() => {
    return networkContext.currentNetwork?.networkType ?? 'MAIN';
  }, [networkContext.currentNetwork?.networkType]);
  const { navigateForResult, onFinish } = useBaseContainer({});
  const caWalletInfo = useIntervalQueryCAInfoByAddress(currentNetwork, newWallet?.address);
  usePreventScreenCapture('LoginQRCode');

  const dealWithSetPin = useCallback(
    (afterVerifiedData: AfterVerifiedConfig | string) => {
      navigateForResult<SetPinPageResult, SetPinPageProps>(
        PortkeyEntries.SET_PIN,
        {
          params: {
            deliveredSetPinInfo:
              typeof afterVerifiedData === 'string' ? afterVerifiedData : JSON.stringify(afterVerifiedData),
          },
        },
        res => {
          const { data } = res;
          if (data && data.finished) {
            onFinish({
              status: 'success',
              data: {
                finished: true,
              },
            });
          }
        },
      );
    },
    [navigateForResult, onFinish],
  );

  useEffect(() => {
    const { caInfo, originChainId } = caWalletInfo || {};
    if (caInfo && newWallet && originChainId) {
      const { caAddress, caHash } = caInfo[caInfo.originChainId ?? 'AELF'] || {};
      if (!caAddress || !caHash) {
        throw new Error('caAddress or caHash is empty');
      }
      dealWithSetPin({
        scanQRCodePathInfo: {
          caHash: caHash,
          caAddress: caAddress,
          walletInfo: newWallet,
          originalChainId: originChainId,
        },
      });
    }
  }, [caWalletInfo, dealWithSetPin, newWallet]);

  const generateWallet = useCallback(() => {
    try {
      console.log('before createNewWallet');
      const wallet = AElfWeb3SDK.createNewWallet();
      const { privateKey, address } = wallet;
      const publicKey = wallet.keyPair.getPublic('hex');
      setNewWallet({
        privateKey,
        publicKey,
        address,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getDeviceInfo = useGetDeviceInfo();
  useEffect(() => {
    const timer = setTimeout(() => {
      generateWallet();
    }, 10);
    let timer2: any;
    const listener = myEvents.clearQRWallet.addListener(() => {
      timer2 = setTimeout(() => {
        setNewWallet(undefined);
        timer2 && clearTimeout(timer2);
        timer2 = setTimeout(() => {
          generateWallet();
        }, 200);
      }, 500);
    });
    return () => {
      timer && clearTimeout(timer);
      timer2 && clearTimeout(timer2);
      listener.remove();
    };
  }, [generateWallet, networkContext.currentNetwork]);

  const qrData: LoginQRData = useMemo(
    () =>
      newWallet
        ? {
            chainType: 'aelf',
            type: 'login',
            address: newWallet.address,
            netWorkType: currentNetwork,
            id: Math.floor(Date.now() / 1000),
            extraData: {
              deviceInfo: getDeviceInfo(),
              version: DEVICE_INFO_VERSION,
            },
          }
        : DEFAULT_WALLET,
    [getDeviceInfo, newWallet, currentNetwork],
  );
  const qrDataStr = useMemo(() => JSON.stringify(qrData), [qrData]);

  const phoneImage = useMemo(() => {
    if (isIOS) {
      return { uri: 'phone' };
    } else {
      return require('../../../assets/image/pngs/phone.png');
    }
  }, []);

  return (
    <View style={[BGStyles.bg1, styles.card, styles.qrCodeCard]}>
      <Touchable style={styles.iconBox} onPress={() => setLoginType(PageLoginType.referral)}>
        <Image source={phoneImage} style={styles.iconStyle} />
      </Touchable>
      <View style={[GStyles.flex1]}>
        <TextXXXL style={[styles.qrCodeTitle, GStyles.textAlignCenter]}>Scan code to log in</TextXXXL>
        <TextS style={[GStyles.textAlignCenter, FontStyles.font3]}>
          Please use the Portkey DApp to scan the QR code
        </TextS>
        <View style={[GStyles.alignCenter, styles.qrCodeBox, GStyles.flex1]}>
          <CommonQRCodeStyled qrData={qrDataStr} hasMask={!newWallet} />
        </View>
      </View>
    </View>
  );
}
