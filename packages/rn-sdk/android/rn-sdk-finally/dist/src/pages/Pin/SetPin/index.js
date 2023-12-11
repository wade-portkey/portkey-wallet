var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=SetPin;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _react=_interopRequireWildcard(require("react"));var _PageContainer=_interopRequireDefault(require("../../../components/PageContainer"));var _ActionSheet=_interopRequireDefault(require("../../../components/ActionSheet"));var _verifier=require("../../../packages/types/verifier");var _PinContainer=_interopRequireDefault(require("../../../components/PinContainer"));var _reactNative=require("react-native");var _UseBaseContainer=_interopRequireDefault(require("../../../model/container/UseBaseContainer"));var _entries=require("../../../config/entries");var _CommonToast=_interopRequireDefault(require("../../../components/CommonToast"));var _jsxFileName="/Users/fengfeiyang/aelf/portkey-wallet/packages/rn-sdk/android/rn-sdk-finally/src/pages/Pin/SetPin/index.tsx";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}var scrollViewProps={disabled:true};var MessageMap=(0,_defineProperty2.default)((0,_defineProperty2.default)((0,_defineProperty2.default)({},_verifier.VerificationType.register,'Are you sure you want to leave this page? All changes will not be saved.'),_verifier.VerificationType.communityRecovery,'Are you sure you want to leave this page? You will need approval from guardians again'),_verifier.VerificationType.addManager,'After returning, you need to scan the code again to authorize login');function SetPin(_ref){var deliveredSetPinInfo=_ref.deliveredSetPinInfo,oldPin=_ref.oldPin;var digitInput=(0,_react.useRef)();var _useState=(0,_react.useState)(),_useState2=(0,_slicedToArray2.default)(_useState,1),errorMessage=_useState2[0];var _useBaseContainer=(0,_UseBaseContainer.default)({entryName:_entries.PortkeyEntries.SET_PIN}),_onFinish=_useBaseContainer.onFinish,navigateForResult=_useBaseContainer.navigateForResult;var leftCallback=function leftCallback(){return _ActionSheet.default.alert({title:'Leave this page?',message:oldPin?MessageMap[_verifier.VerificationType.communityRecovery]:MessageMap[_verifier.VerificationType.communityRecovery],buttons:[{title:'No',type:'outline'},{title:'Yes',onPress:function onPress(){_onFinish({status:'cancel',data:{finished:false}});}}]});};return _react.default.createElement(_PageContainer.default,{scrollViewProps:scrollViewProps,titleDom:true,type:"leftBack",backTitle:oldPin?'Change Pin':undefined,leftCallback:leftCallback,containerStyles:styles.container,__self:this,__source:{fileName:_jsxFileName,lineNumber:56,columnNumber:5}},_react.default.createElement(_PinContainer.default,{showHeader:true,ref:digitInput,title:oldPin?'Please enter a new pin':'Enter pin to protect your device',onFinish:function onFinish(pin){navigateForResult(_entries.PortkeyEntries.CONFIRM_PIN,{params:{deliveredSetPinInfo:deliveredSetPinInfo,oldPin:oldPin,pin:pin}},function(res){if((res==null?void 0:res.status)==='success'){_onFinish({status:'success',data:{finished:true}});}else if((res==null?void 0:res.status)!=='system'){var _digitInput$current;_CommonToast.default.failError('Retry again');(_digitInput$current=digitInput.current)==null?void 0:_digitInput$current.reset();}});},errorMessage:errorMessage,__self:this,__source:{fileName:_jsxFileName,lineNumber:63,columnNumber:7}}));}var styles=_reactNative.StyleSheet.create({container:{flex:1}});