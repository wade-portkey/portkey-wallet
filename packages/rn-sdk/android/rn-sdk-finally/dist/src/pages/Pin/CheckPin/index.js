var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=CheckPin;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _react=_interopRequireWildcard(require("react"));var _PageContainer=_interopRequireDefault(require("../../../components/PageContainer"));var _misc=require("../../../packages/constants/misc");var _PinContainer=_interopRequireDefault(require("../../../components/PinContainer"));var _reactNative=require("react-native");var _types=require("../../../packages/utils/wallet/types");var _UseBaseContainer=_interopRequireDefault(require("../../../model/container/UseBaseContainer"));var _entries=require("../../../config/entries");var _core=require("../../../model/verify/core");var _SetBiometrics=require("../SetBiometrics");var _Loading=_interopRequireDefault(require("../../../components/Loading"));var _useEffectOnce=_interopRequireDefault(require("../../../hooks/useEffectOnce"));var _deviceEvent=_interopRequireDefault(require("../../../utils/deviceEvent"));var _wallet=require("../../../model/wallet");var _jsxFileName="/Users/fengfeiyang/aelf/portkey-wallet/packages/rn-sdk/android/rn-sdk-finally/src/pages/Pin/CheckPin/index.tsx";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}function CheckPin(props){var targetScene=props.targetScene,openBiometrics=props.openBiometrics;var _useState=(0,_react.useState)(),_useState2=(0,_slicedToArray2.default)(_useState,2),errorMessage=_useState2[0],setErrorMessage=_useState2[1];var pinRef=(0,_react.useRef)();var _useState3=(0,_react.useState)(false),_useState4=(0,_slicedToArray2.default)(_useState3,2),canUseBiometrics=_useState4[0],setCanUseBiometrics=_useState4[1];var _useBaseContainer=(0,_UseBaseContainer.default)({entryName:_entries.PortkeyEntries.CHECK_PIN}),onFinish=_useBaseContainer.onFinish,navigationTo=_useBaseContainer.navigateTo;var onChangeText=(0,_react.useCallback)(function(){var _ref=(0,_asyncToGenerator2.default)(function*(pin){if(pin.length===_misc.PIN_SIZE){if(!(yield(0,_core.checkPin)(pin))){var _pinRef$current;(_pinRef$current=pinRef.current)==null?void 0:_pinRef$current.reset();return setErrorMessage(_types.PinErrorMessage.invalidPin);}if(targetScene==='changePin'){navigationTo(_entries.PortkeyEntries.SET_PIN,{params:{oldPin:pin}});return;}_Loading.default.show();_deviceEvent.default.openBiometrics.emit(pin);(0,_core.unLockTempWallet)(pin).then((0,_asyncToGenerator2.default)(function*(){_Loading.default.hide();var walletInfo=yield(0,_wallet.getUnlockedWallet)();onFinish({status:'success',data:{pin:pin,walletInfo:walletInfo}});}));}else if(errorMessage){setErrorMessage(undefined);}});return function(_x){return _ref.apply(this,arguments);};}(),[errorMessage,navigationTo,onFinish,targetScene]);var handleBiometrics=function(){var _ref3=(0,_asyncToGenerator2.default)(function*(){var res=yield(0,_SetBiometrics.touchAuth)();if(res!=null&&res.success){_Loading.default.show();yield(0,_core.unLockTempWallet)('use-bio',true);var walletInfo=yield(0,_wallet.getUnlockedWallet)();_Loading.default.hide();onFinish({status:'success',data:{pin:'FAKE',walletInfo:walletInfo}});}else{setErrorMessage('Biometrics failed');}});return function handleBiometrics(){return _ref3.apply(this,arguments);};}();(0,_useEffectOnce.default)(function(){if(openBiometrics||targetScene==='changePin'){return;}(0,_core.getUseBiometric)().then(function(res){setCanUseBiometrics(res);if(res){handleBiometrics();}});});return _react.default.createElement(_PageContainer.default,{titleDom:true,type:"leftBack",backTitle:'back',containerStyles:styles.container,leftCallback:function leftCallback(){onFinish({status:'cancel',data:{pin:''}});},scrollViewProps:{disabled:true},__self:this,__source:{fileName:_jsxFileName,lineNumber:94,columnNumber:5}},_react.default.createElement(_PinContainer.default,{showHeader:true,ref:pinRef,title:"Enter Pin",errorMessage:errorMessage,onChangeText:onChangeText,isBiometrics:canUseBiometrics,onBiometricsPress:handleBiometrics,__self:this,__source:{fileName:_jsxFileName,lineNumber:106,columnNumber:7}}));}var styles=_reactNative.StyleSheet.create({container:{flex:1}});