import React, { useCallback, useRef, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Svg from 'components/Svg';
import { pTd } from 'utils/unit';
import { defaultColors } from 'assets/theme';
import { useLanguage } from 'i18n/hooks';
import * as ImagePicker from 'expo-image-picker';
import { TextM } from 'components/CommonText';
import GStyles from 'assets/theme/GStyles';
import { FontStyles } from 'assets/theme/styles';
import { isIOS, screenHeight, screenWidth } from '@portkey-wallet/utils/mobile/device';
import { Camera } from 'expo-camera';
import { expandQrData } from '@portkey-wallet/utils/qrCode';
import { checkIsUrl } from '@portkey-wallet/utils/dapp/browser';
// import { useDiscoverJumpWithNetWork } from 'hooks/discover'; // currently we do not use this
import Loading from 'components/Loading';
import CommonToast from 'components/CommonToast';
import { QRData, isLoginQRData } from '@portkey-wallet/types/types-ca/qrcode';
import { isAddress } from '@portkey-wallet/utils';
import { NetworkType } from '@portkey-wallet/types';
import { EndPoints, PortkeyConfig } from 'global/constants';
import useBaseContainer, { VoidResult } from 'model/container/UseBaseContainer';
import { PortkeyEntries, isPortkeyEntries } from 'config/entries';
import { EntryResult, PermissionType, chooseImageAndroid, PortkeyModulesEntity } from 'service/native-modules';
import useEffectOnce from 'hooks/useEffectOnce';
import { ScanToLoginProps } from 'pages/Login/ScanLogin';
import { isWalletUnlocked } from 'model/verify/after-verify';
import { checkIsPortKeyUrl, isEntryScheme } from 'utils/scheme';
import { myThrottle } from 'utils/commonUtil';

const QrScanner: React.FC = () => {
  const { t } = useLanguage();
  const canScan = useRef<boolean>(true);
  // const jumpToWebview = useDiscoverJumpWithNetWork();
  const [refresh, setRefresh] = useState<boolean>();
  const { onFinish, navigateForResult, navigationTo } = useBaseContainer({
    entryName: PortkeyEntries.SCAN_QR_CODE,
  });
  const navigateBack = (res: EntryResult<ScanQRCodeResult> = { status: 'success', data: {} }) => {
    onFinish(res);
  };

  useEffectOnce(() => {
    setRefresh(false);
    ensurePermission('camera', withoutPermissionWarning);
  });

  const withoutPermissionWarning = (fatal = true) => {
    CommonToast.fail(`Please allow permissions to use${fatal ? ', page will close in 3 seconds' : ''}.`);
    fatal &&
      setTimeout(() => {
        navigateBack({ status: 'fail', data: {} });
      }, 3000);
  };

  const invalidQRCode = (text: InvalidQRCodeText) => {
    CommonToast.fail(text);
  };

  const handleQRCodeData = async (data: QRData) => {
    const { address, chainType } = data;
    if (!isAddress(address, chainType)) return invalidQRCode(InvalidQRCodeText.INVALID_QR_CODE);
    if (isLoginQRData(data)) {
      if (!(await isWalletUnlocked())) return invalidQRCode(InvalidQRCodeText.DID_NOT_UNLOCK);
      navigateForResult<VoidResult, ScanToLoginProps>(
        PortkeyEntries.SCAN_LOG_IN,
        {
          params: {
            data: JSON.stringify(data),
          },
        },
        () => {
          setRefresh(false);
        },
      );
      setRefresh(true);
    } else {
      CommonToast.fail('Content not supported by now');
    }
  };
  const handlePortKeyScheme = useCallback(
    (portkeyUrl: string) => {
      const isEntry = isEntryScheme(portkeyUrl);
      console.log('handlePortKeyScheme isEntry', isEntry);
      if (isEntry) {
        const entry = isEntry.entry;
        const params = isEntry.query;
        if (entry !== undefined && isPortkeyEntries(entry)) {
          navigationTo(entry as PortkeyEntries, { params: params });
        } else {
          CommonToast.fail('It looks like you want to jump to the page, but you don’t have the entry parameter');
        }
      }
    },
    [navigationTo],
  );
  const handleBarCodeScanned = myThrottle(async ({ data = '' }) => {
    if (!canScan.current) {
      return;
    }
    canScan.current = false;
    if (typeof data !== 'string') return invalidQRCode(InvalidQRCodeText.INVALID_QR_CODE);
    const currentNetwork = await determineCurrentNetwork();
    try {
      const str = data.replace(/("|'|\s)/g, '');
      if (checkIsUrl(str)) {
        if (checkIsPortKeyUrl(str)) {
          //handle "portkey" custom scheme
          handlePortKeyScheme(str);
        } else {
          return invalidQRCode(InvalidQRCodeText.INVALID_QR_CODE);
        }
        return;
      }
      const qrCodeData = expandQrData(JSON.parse(data));
      // if not currentNetwork
      if (currentNetwork !== qrCodeData.netWorkType)
        return invalidQRCode(
          currentNetwork === 'MAIN' ? InvalidQRCodeText.SWITCH_TO_TESTNET : InvalidQRCodeText.SWITCH_TO_MAINNET,
        );
      handleQRCodeData(qrCodeData);
    } catch (error) {
      console.log(error);
      return invalidQRCode(InvalidQRCodeText.INVALID_QR_CODE);
    } finally {
      Loading.hide();
      canScan.current = true;
    }
  }, 3000);

  const selectImage = async () => {
    const permission = await ensurePermission('photo', withoutPermissionWarning, false);
    if (!permission) return;
    let uri;
    if (Platform.OS === 'android') {
      uri = await chooseImageAndroid();
    } else {
      const result = (await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
      })) as unknown as { assets: Array<{ uri: string }> };
      uri = result?.assets?.[0]?.uri ?? undefined;
    }
    console.log('uri', uri);
    if (uri) {
      const scanResult = await BarCodeScanner.scanFromURLAsync(uri, [BarCodeScanner.Constants.BarCodeType.qr]);
      console.log('qrResult', scanResult[0]?.data, uri);
      if (scanResult[0]?.data) {
        handleBarCodeScanned({ data: scanResult[0]?.data || '' });
      } else {
        CommonToast.fail('No QR code found in the picture');
      }
    }
  };

  return (
    <View style={PageStyle.wrapper}>
      {refresh ? null : (
        <Camera
          ratio={'16:9'}
          style={[PageStyle.barCodeScanner, !isIOS && PageStyle.barCodeScannerAndroid]}
          // barCodeScannerSettings={{
          //   interval: 3000,
          //   barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          // }}
          onBarCodeScanned={handleBarCodeScanned}>
          <SafeAreaView style={PageStyle.innerView}>
            <View style={PageStyle.iconWrap}>
              <Text style={PageStyle.leftBlock} />
              <TouchableOpacity
                style={PageStyle.svgWrap}
                onPress={() => {
                  navigateBack({ status: 'cancel', data: {} });
                }}>
                <Svg icon="close1" size={pTd(14)} iconStyle={PageStyle.icon} />
              </TouchableOpacity>
            </View>
            <Svg icon="scan-square" size={pTd(240)} iconStyle={PageStyle.scan} />
            <TextM style={PageStyle.tips}>{t('only support Login code by now')}</TextM>

            <TouchableOpacity style={[PageStyle.albumWrap, GStyles.alignCenter]} onPress={selectImage}>
              <Svg icon="album" size={pTd(48)} />
              <TextM style={[FontStyles.font2, PageStyle.albumText]}>{t('Album')}</TextM>
            </TouchableOpacity>
          </SafeAreaView>
        </Camera>
      )}
    </View>
  );
};

export default QrScanner;

export const PageStyle = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
    backgroundColor: defaultColors.bgColor1,
  },
  barCodeScanner: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 100,
  },
  barCodeScannerAndroid: {
    width: screenWidth,
    height: screenHeight,
  },
  innerView: {
    width: '100%',
    height: '100%',
  },
  iconWrap: {
    marginTop: pTd(16),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  icon: {
    width: pTd(40),
  },
  svgWrap: {
    ...GStyles.paddingArg(16, 0, 16, 16),
  },
  scan: {
    marginTop: pTd(136),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    marginTop: pTd(62),
    fontSize: pTd(16),
    color: defaultColors.font2,
    textAlign: 'center',
  },
  tips: {
    // position: 'absolute',
    // bottom: 100,
    color: defaultColors.font7,
    textAlign: 'center',
    width: screenWidth,
    lineHeight: pTd(20),
    marginTop: pTd(54),
  },
  albumWrap: {
    position: 'absolute',
    bottom: pTd(75),
  },
  albumText: {
    marginTop: pTd(4),
    textAlign: 'center',
  },
  leftBlock: {
    flex: 1,
  },
});
export interface RouteInfoType {
  name: 'SendHome' | 'Tab';
  params: {
    assetInfo: {
      symbol: string;
    };
  };
}

export enum InvalidQRCodeText {
  SWITCH_TO_MAINNET = 'Please switch to aelf Mainnet before scanning the QR code',
  SWITCH_TO_TESTNET = 'Please switch to aelf Testnet before scanning the QR code',
  INVALID_QR_CODE = 'The QR code is invalid',
  DID_NOT_UNLOCK = 'Please unlock your wallet first',
}

export interface ScanQRCodeResult {}

const determineCurrentNetwork = async (): Promise<NetworkType> => {
  return (await PortkeyConfig.endPointUrl()) === EndPoints.MAIN_NET ? 'MAIN' : 'TESTNET';
};

const ensurePermission = async (
  permission: PermissionType,
  ifThrowError: (fatal?: boolean) => void,
  fatal = true,
): Promise<boolean> => {
  try {
    const isOpen = await PortkeyModulesEntity.PermissionModule.isPermissionGranted(permission);
    if (isOpen) {
      return true;
    } else {
      await PortkeyModulesEntity.PermissionModule.requestPermission(permission);
      if (!(await PortkeyModulesEntity.PermissionModule.isPermissionGranted(permission))) {
        throw new Error('camera permission denied');
      }
      return true;
    }
  } catch (e) {
    console.error(e);
    ifThrowError(fatal);
  }
  return false;
};
