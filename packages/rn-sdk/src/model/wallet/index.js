"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.useUnlockedWallet = exports.getUnlockedWallet = void 0;
var constants_1 = require("global/constants");
var useEffectOnce_1 = require("hooks/useEffectOnce");
var handler_1 = require("model/contract/handler");
var global_1 = require("model/global");
var core_1 = require("model/verify/core");
var controller_1 = require("network/controller");
var react_1 = require("react");
var cache_1 = require("service/storage/cache");
var getUnlockedWallet = function (_a) {
    var _b = _a === void 0 ? DefaultConfig : _a, getMultiCaAddresses = _b.getMultiCaAddresses;
    return __awaiter(void 0, void 0, void 0, function () {
        var _c, sessionId, accountIdentifier, fromRecovery, _d, originalChainId, privateKey, publicKey, address, originalCaInfo, checkedOriginalChainId, chainInfo, endPointUrl, caInfo, _e, multiCaAddresses;
        var _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, (0, core_1.isWalletUnlocked)()];
                case 1:
                    if (!(_g.sent()))
                        throw new Error('wallet is not unlocked');
                    return [4 /*yield*/, (0, core_1.getTempWalletConfig)()];
                case 2:
                    _c = (_g.sent()) || {}, sessionId = _c.sessionId, accountIdentifier = _c.accountIdentifier, fromRecovery = _c.fromRecovery, _d = _c.originalChainId, originalChainId = _d === void 0 ? 'AELF' : _d, privateKey = _c.privateKey, publicKey = _c.publicKey, address = _c.address, originalCaInfo = _c.caInfo;
                    checkedOriginalChainId = originalChainId;
                    if (!accountIdentifier) return [3 /*break*/, 4];
                    return [4 /*yield*/, controller_1.NetworkController.getRegisterResult(accountIdentifier)];
                case 3:
                    chainInfo = _g.sent();
                    checkedOriginalChainId = ((_f = chainInfo.result) === null || _f === void 0 ? void 0 : _f.originChainId) || originalChainId;
                    _g.label = 4;
                case 4: return [4 /*yield*/, constants_1.PortkeyConfig.endPointUrl()];
                case 5:
                    endPointUrl = _g.sent();
                    (0, constants_1.setCurrChainId)(checkedOriginalChainId);
                    constants_1.PortkeyConfig;
                    if (!(originalCaInfo !== null && originalCaInfo !== void 0)) return [3 /*break*/, 6];
                    _e = originalCaInfo;
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, (0, global_1.getCaInfoByAccountIdentifierOrSessionId)(originalChainId, accountIdentifier, fromRecovery, sessionId)];
                case 7:
                    _e = (_g.sent());
                    _g.label = 8;
                case 8:
                    caInfo = _e;
                    if (!caInfo)
                        throw new Error('caInfo is not exist');
                    multiCaAddresses = {};
                    multiCaAddresses[originalChainId] = caInfo.caAddress;
                    if (!getMultiCaAddresses) return [3 /*break*/, 10];
                    return [4 /*yield*/, getCachedCaAddress(endPointUrl, caInfo, originalChainId)];
                case 9:
                    multiCaAddresses = _g.sent();
                    _g.label = 10;
                case 10: return [2 /*return*/, {
                        caInfo: caInfo,
                        originChainId: checkedOriginalChainId,
                        privateKey: privateKey,
                        publicKey: publicKey,
                        address: address,
                        multiCaAddresses: multiCaAddresses,
                        name: 'Wallet 01'
                    }];
            }
        });
    });
};
exports.getUnlockedWallet = getUnlockedWallet;
var getCachedCaAddress = function (endPoint, originalCaInfo, originalChainId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, cache_1.handleCachedValue)({
                getIdentifier: function () { return __awaiter(void 0, void 0, void 0, function () {
                    var caHash;
                    return __generator(this, function (_a) {
                        caHash = originalCaInfo.caHash;
                        return [2 /*return*/, "".concat(caHash, "_").concat(endPoint)];
                    });
                }); },
                getValueIfNonExist: function () { return __awaiter(void 0, void 0, void 0, function () {
                    var items, multiCaAddresses, _i, items_1, item, res;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, controller_1.NetworkController.getNetworkInfo()];
                            case 1:
                                items = (_b.sent()).items;
                                multiCaAddresses = {};
                                multiCaAddresses[originalChainId] = originalCaInfo.caAddress;
                                _i = 0, items_1 = items;
                                _b.label = 2;
                            case 2:
                                if (!(_i < items_1.length)) return [3 /*break*/, 5];
                                item = items_1[_i];
                                if (item.chainId === originalChainId)
                                    return [3 /*break*/, 4];
                                return [4 /*yield*/, (0, handler_1.callGetHolderInfoMethod)(originalCaInfo.caHash, item.caContractAddress, item.endPoint)];
                            case 3:
                                res = _b.sent();
                                if (res === null || res === void 0 ? void 0 : res.error) {
                                    console.log('getMultiCaAddresses error, chain: ', item.chainId, 'res: ', res === null || res === void 0 ? void 0 : res.error);
                                    return [3 /*break*/, 4];
                                }
                                else {
                                    console.log('getMultiCaAddresses success, chain: ', item.chainId, 'res: ', res === null || res === void 0 ? void 0 : res.data);
                                    multiCaAddresses[item.chainId] = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.caAddress;
                                }
                                _b.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 2];
                            case 5: return [2 /*return*/, multiCaAddresses];
                        }
                    });
                }); },
                target: 'PERMANENT'
            })];
    });
}); };
var useUnlockedWallet = function (config) {
    if (config === void 0) { config = DefaultConfig; }
    var _a = (0, react_1.useState)(), wallet = _a[0], setWallet = _a[1];
    (0, useEffectOnce_1["default"])(function () { return __awaiter(void 0, void 0, void 0, function () {
        var tempWallet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, exports.getUnlockedWallet)(config)];
                case 1:
                    tempWallet = _a.sent();
                    setWallet(tempWallet);
                    return [2 /*return*/];
            }
        });
    }); });
    return {
        wallet: wallet
    };
};
exports.useUnlockedWallet = useUnlockedWallet;
var DefaultConfig = {
    getMultiCaAddresses: false
};
