"use strict";
exports.__esModule = true;
exports.initJsMethodService = void 0;
var react_native_1 = require("react-native");
var BackgroundTasks_1 = require("service/JsModules/BackgroundTasks");
var BatchedBridges_1 = require("service/JsModules/BatchedBridges");
var initJsMethodService = function () {
    if (react_native_1.Platform.OS === 'ios') {
        (0, BatchedBridges_1.initJSBatchedBridgeModules)();
    }
    else {
        (0, BackgroundTasks_1.initHeadlessTasks)();
    }
};
exports.initJsMethodService = initJsMethodService;
