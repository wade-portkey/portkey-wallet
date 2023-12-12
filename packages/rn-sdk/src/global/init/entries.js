"use strict";
exports.__esModule = true;
exports.initEntries = exports.LaunchModeSet = exports.LaunchMode = void 0;
var TestPage_1 = require("components/TestPage");
var GuardianApproval_1 = require("pages/Entries/GuardianApproval");
var SignIn_1 = require("pages/Entries/SignIn");
var SelectCountry_1 = require("pages/Entries/SelectCountry");
var SignUp_1 = require("pages/Entries/SignUp");
var VerifierDetails_1 = require("pages/Entries/VerifierDetails");
var entries_1 = require("config/entries");
var ViewOnWebView_1 = require("pages/Activity/ViewOnWebView");
var AccountSettings_1 = require("pages/My/AccountSettings");
var ScanLogin_1 = require("pages/Login/ScanLogin");
var CheckPin_1 = require("pages/Pin/CheckPin");
var ConfirmPin_1 = require("pages/Pin/ConfirmPin");
var SetBiometrics_1 = require("pages/Pin/SetBiometrics");
var SetPin_1 = require("pages/Pin/SetPin");
var QrScanner_1 = require("pages/QrScanner");
var GuardianHome_1 = require("pages/GuardianManage/GuardianHome");
var react_native_1 = require("react-native");
var Biometric_1 = require("pages/My/Biometric");
var AddGuardian_1 = require("pages/Guardian/GuardianManage/AddGuardian");
var ModifyGuardian_1 = require("pages/Guardian/GuardianManage/ModifyGuardian");
var GuardianDetail_1 = require("pages/Guardian/GuardianDetail");
var ReceiveToken_1 = require("pages/Assets/ReceiveToken");
var AssetsHome_1 = require("pages/Assets/Home/AssetsHome");
var PaymentSecurityHome_1 = require("pages/My/WalletSecurity/PaymentSecurity/PaymentSecurityHome");
var PaymentSecurityDetail_1 = require("pages/My/WalletSecurity/PaymentSecurity/PaymentSecurityDetail");
var PaymentSecurityEdit_1 = require("pages/My/WalletSecurity/PaymentSecurity/PaymentSecurityEdit");
var commonUtil_1 = require("utils/commonUtil");
var initEntries = function () {
    var entryConfig = new Map();
    entryConfig.set(entries_1.PortkeyEntries.TEST, function () { return TestPage_1["default"]; });
    // entry stage
    entryConfig.set(entries_1.PortkeyEntries.SIGN_IN_ENTRY, function () { return SignIn_1["default"]; });
    entryConfig.set(entries_1.PortkeyEntries.SELECT_COUNTRY_ENTRY, function () { return SelectCountry_1["default"]; });
    entryConfig.set(entries_1.PortkeyEntries.SIGN_UP_ENTRY, function () { return SignUp_1["default"]; });
    // verify stage
    entryConfig.set(entries_1.PortkeyEntries.VERIFIER_DETAIL_ENTRY, function () { return VerifierDetails_1["default"]; });
    entryConfig.set(entries_1.PortkeyEntries.GUARDIAN_APPROVAL_ENTRY, function () { return GuardianApproval_1["default"]; });
    // config stage
    entryConfig.set(entries_1.PortkeyEntries.CHECK_PIN, function () { return CheckPin_1["default"]; });
    entryConfig.set(entries_1.PortkeyEntries.SET_PIN, function () { return SetPin_1["default"]; });
    entryConfig.set(entries_1.PortkeyEntries.CONFIRM_PIN, function () { return ConfirmPin_1["default"]; });
    entryConfig.set(entries_1.PortkeyEntries.SET_BIO, function () { return SetBiometrics_1["default"]; });
    // scan QR code
    entryConfig.set(entries_1.PortkeyEntries.SCAN_QR_CODE, function () { return QrScanner_1["default"]; });
    entryConfig.set(entries_1.PortkeyEntries.SCAN_LOG_IN, function () { return ScanLogin_1["default"]; });
    // guardian manage
    entryConfig.set(entries_1.PortkeyEntries.GUARDIAN_HOME_ENTRY, function () { return GuardianHome_1["default"]; });
    entryConfig.set(entries_1.PortkeyEntries.GUARDIAN_DETAIL_ENTRY, function () { return GuardianDetail_1["default"]; });
    entryConfig.set(entries_1.PortkeyEntries.ADD_GUARDIAN_ENTRY, function () { return AddGuardian_1["default"]; });
    entryConfig.set(entries_1.PortkeyEntries.MODIFY_GUARDIAN_ENTRY, function () { return ModifyGuardian_1["default"]; });
    // webview
    entryConfig.set(entries_1.PortkeyEntries.VIEW_ON_WEBVIEW, function () { return ViewOnWebView_1["default"]; });
    // account setting
    entryConfig.set(entries_1.PortkeyEntries.ACCOUNT_SETTING_ENTRY, function () { return AccountSettings_1["default"]; });
    entryConfig.set(entries_1.PortkeyEntries.BIOMETRIC_SWITCH_ENTRY, function () { return Biometric_1["default"]; });
    // assets module
    entryConfig.set(entries_1.PortkeyEntries.ASSETS_HOME_ENTRY, function () { return AssetsHome_1["default"]; });
    entryConfig.set(entries_1.PortkeyEntries.RECEIVE_TOKEN_ENTRY, function () { return ReceiveToken_1["default"]; });
    entryConfig.set(entries_1.PortkeyEntries.PAYMENT_SECURITY_HOME_ENTRY, function () { return PaymentSecurityHome_1["default"]; });
    entryConfig.set(entries_1.PortkeyEntries.PAYMENT_SECURITY_DETAIL_ENTRY, function () { return PaymentSecurityDetail_1["default"]; });
    entryConfig.set(entries_1.PortkeyEntries.PAYMENT_SECURITY_EDIT_ENTRY, function () { return PaymentSecurityEdit_1["default"]; });
    for (var _i = 0, entryConfig_1 = entryConfig; _i < entryConfig_1.length; _i++) {
        var _a = entryConfig_1[_i], key = _a[0], value = _a[1];
        react_native_1.AppRegistry.registerComponent((0, commonUtil_1.wrapEntry)(key), value);
    }
    registerLaunchMode();
};
exports.initEntries = initEntries;
var LaunchMode;
(function (LaunchMode) {
    LaunchMode["STANDARD"] = "standard";
    LaunchMode["SINGLE_TASK"] = "single_task";
    LaunchMode["SINGLE_TOP"] = "single_top";
})(LaunchMode = exports.LaunchMode || (exports.LaunchMode = {}));
exports.LaunchModeSet = new Map();
var registerLaunchMode = function () {
    exports.LaunchModeSet.set(entries_1.PortkeyEntries.ACCOUNT_SETTING_ENTRY, LaunchMode.SINGLE_TASK);
    exports.LaunchModeSet.set(entries_1.PortkeyEntries.PAYMENT_SECURITY_HOME_ENTRY, LaunchMode.SINGLE_TASK);
};
