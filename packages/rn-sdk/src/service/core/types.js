"use strict";
exports.__esModule = true;
exports.WalletState = exports.TYPES = void 0;
var TYPES = {
    AccountModule: Symbol["for"]('AccountModule'),
    UIManagerModule: Symbol["for"]('UIManagerModule')
};
exports.TYPES = TYPES;
var WalletState;
(function (WalletState) {
    WalletState[WalletState["NONE"] = 0] = "NONE";
    WalletState[WalletState["LOCKED"] = 1] = "LOCKED";
    WalletState[WalletState["UNLOCKED"] = 2] = "UNLOCKED";
})(WalletState = exports.WalletState || (exports.WalletState = {}));
