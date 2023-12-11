import TestPage from '@portkey/rn-sdk/src/components/TestPage';
import GuardianApprovalEntryPage from '@portkey/rn-sdk/src/pages/Entries/GuardianApproval';
import SignInEntryPage from '@portkey/rn-sdk/src/pages/Entries/SignIn';
import SelectCountryPage from '@portkey/rn-sdk/src/pages/Entries/SelectCountry';
import SignUpEntryPage from '@portkey/rn-sdk/src/pages/Entries/SignUp';
import VerifierDetailsEntryPage from '@portkey/rn-sdk/src/pages/Entries/VerifierDetails';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import ViewOnWebView from '@portkey/rn-sdk/src/pages/Activity/ViewOnWebView';
import AccountSettings from '@portkey/rn-sdk/src/pages/My/AccountSettings';
import ScanLogin from '@portkey/rn-sdk/src/pages/Login/ScanLogin';
import CheckPin from '@portkey/rn-sdk/src/pages/Pin/CheckPin';
import ConfirmPin from '@portkey/rn-sdk/src/pages/Pin/ConfirmPin';
import SetBiometrics from '@portkey/rn-sdk/src/pages/Pin/SetBiometrics';
import SetPin from '@portkey/rn-sdk/src/pages/Pin/SetPin';
import QrScanner from '@portkey/rn-sdk/src/pages/QrScanner';
import GuardianHome from '@portkey/rn-sdk/src/pages/GuardianManage/GuardianHome';
import { AppRegistry, ComponentProvider } from 'react-native';
import Biometric from '@portkey/rn-sdk/src/pages/My/Biometric';
import AddGuardian from '@portkey/rn-sdk/src/pages/Guardian/GuardianManage/AddGuardian';
import ModifyGuardian from '@portkey/rn-sdk/src/pages/Guardian/GuardianManage/ModifyGuardian';
import GuardianDetail from '@portkey/rn-sdk/src/pages/Guardian/GuardianDetail';
import ReceiveTokenPage from '@portkey/rn-sdk/src/pages/Assets/ReceiveToken';
import AssetsHome from '@portkey/rn-sdk/src/pages/Assets/Home/AssetsHome';
import PaymentSecurityList from '@portkey/rn-sdk/src/pages/My/WalletSecurity/PaymentSecurity/PaymentSecurityHome';
import PaymentSecurityDetail from '@portkey/rn-sdk/src/pages/My/WalletSecurity/PaymentSecurity/PaymentSecurityDetail';
import PaymentSecurityEdit from '@portkey/rn-sdk/src/pages/My/WalletSecurity/PaymentSecurity/PaymentSecurityEdit';

type AcceptableComponentType = ComponentProvider;

const initEntries = () => {
  const entryConfig = new Map<string, AcceptableComponentType>();
  entryConfig.set(PortkeyEntries.TEST, () => TestPage);

  // entry stage
  entryConfig.set(PortkeyEntries.SIGN_IN_ENTRY, () => SignInEntryPage);
  entryConfig.set(PortkeyEntries.SELECT_COUNTRY_ENTRY, () => SelectCountryPage);
  entryConfig.set(PortkeyEntries.SIGN_UP_ENTRY, () => SignUpEntryPage);

  // verify stage
  entryConfig.set(PortkeyEntries.VERIFIER_DETAIL_ENTRY, () => VerifierDetailsEntryPage);
  entryConfig.set(PortkeyEntries.GUARDIAN_APPROVAL_ENTRY, () => GuardianApprovalEntryPage);

  // config stage
  entryConfig.set(PortkeyEntries.CHECK_PIN, () => CheckPin);
  entryConfig.set(PortkeyEntries.SET_PIN, () => SetPin);
  entryConfig.set(PortkeyEntries.CONFIRM_PIN, () => ConfirmPin);
  entryConfig.set(PortkeyEntries.SET_BIO, () => SetBiometrics);

  // scan QR code
  entryConfig.set(PortkeyEntries.SCAN_QR_CODE, () => QrScanner);
  entryConfig.set(PortkeyEntries.SCAN_LOG_IN, () => ScanLogin);

  // guardian manage
  entryConfig.set(PortkeyEntries.GUARDIAN_HOME_ENTRY, () => GuardianHome);
  entryConfig.set(PortkeyEntries.GUARDIAN_DETAIL_ENTRY, () => GuardianDetail);
  entryConfig.set(PortkeyEntries.ADD_GUARDIAN_ENTRY, () => AddGuardian);
  entryConfig.set(PortkeyEntries.MODIFY_GUARDIAN_ENTRY, () => ModifyGuardian);

  // webview
  entryConfig.set(PortkeyEntries.VIEW_ON_WEBVIEW, () => ViewOnWebView);

  // account setting
  entryConfig.set(PortkeyEntries.ACCOUNT_SETTING_ENTRY, () => AccountSettings);
  entryConfig.set(PortkeyEntries.BIOMETRIC_SWITCH_ENTRY, () => Biometric);

  // assets module
  entryConfig.set(PortkeyEntries.ASSETS_HOME_ENTRY, () => AssetsHome);
  entryConfig.set(PortkeyEntries.RECEIVE_TOKEN_ENTRY, () => ReceiveTokenPage);

  entryConfig.set(PortkeyEntries.PAYMENT_SECURITY_HOME_ENTRY, () => PaymentSecurityList);
  entryConfig.set(PortkeyEntries.PAYMENT_SECURITY_DETAIL_ENTRY, () => PaymentSecurityDetail);
  entryConfig.set(PortkeyEntries.PAYMENT_SECURITY_EDIT_ENTRY, () => PaymentSecurityEdit);

  for (const [key, value] of entryConfig) {
    AppRegistry.registerComponent(key, value);
  }
  registerLaunchMode();
};
export enum LaunchMode {
  STANDARD = 'standard',
  SINGLE_TASK = 'single_task',
  SINGLE_TOP = 'single_top',
}
export const LaunchModeSet = new Map<string, string>();
const registerLaunchMode = () => {
  LaunchModeSet.set(PortkeyEntries.ACCOUNT_SETTING_ENTRY, LaunchMode.SINGLE_TASK);
  LaunchModeSet.set(PortkeyEntries.PAYMENT_SECURITY_HOME_ENTRY, LaunchMode.SINGLE_TASK);
};
export { initEntries };
