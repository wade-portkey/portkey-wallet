var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=PhoneInput;exports.inputStyles=void 0;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _objectWithoutProperties2=_interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));var _react=_interopRequireWildcard(require("react"));var _reactNative=require("react-native");var _hooks=require("../../i18n/hooks");var _Touchable=_interopRequireDefault(require("../Touchable"));var _CommonInput=_interopRequireDefault(require("../CommonInput"));var _unit=require("../../utils/unit");var _Svg=_interopRequireDefault(require("../Svg"));var _theme=require("../../assets/theme");var _CommonText=require("../CommonText");var _entries=require("../../config/entries");var _jsxFileName="/Users/fengfeiyang/aelf/portkey-wallet/packages/rn-sdk/android/rn-sdk-finally/src/components/PhoneInput/index.tsx";var _excluded=["selectCountry","onCountryChange","navigateForResult"];function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}function PhoneInput(_ref){var selectCountry=_ref.selectCountry,onCountryChange=_ref.onCountryChange,navigateForResult=_ref.navigateForResult,inputProps=(0,_objectWithoutProperties2.default)(_ref,_excluded);var _useLanguage=(0,_hooks.useLanguage)(),t=_useLanguage.t;var iptRef=(0,_react.useRef)();var pushToSelectCountry=function pushToSelectCountry(){navigateForResult(_entries.PortkeyEntries.SELECT_COUNTRY_ENTRY,{selectCountry:JSON.stringify(selectCountry)},function(res){var _ref2=res.data||{},result=_ref2.result;if(result){try{var _country=JSON.parse(result);onCountryChange==null?void 0:onCountryChange(_country);}catch(ignored){}}});};return _react.default.createElement(_CommonInput.default,(0,_extends2.default)({ref:iptRef,leftIcon:_react.default.createElement(_Touchable.default,{style:inputStyles.countryRow,onPress:pushToSelectCountry,__self:this,__source:{fileName:_jsxFileName,lineNumber:56,columnNumber:9}},_react.default.createElement(_CommonText.TextM,{__self:this,__source:{fileName:_jsxFileName,lineNumber:57,columnNumber:11}},"+ ",selectCountry==null?void 0:selectCountry.code),_react.default.createElement(_Svg.default,{color:_theme.defaultColors.font3,size:12,icon:"down-arrow",__self:this,__source:{fileName:_jsxFileName,lineNumber:58,columnNumber:11}})),type:"general",maxLength:30,autoCorrect:false,keyboardType:"number-pad",placeholder:t('Enter Phone Number')},inputProps,{__self:this,__source:{fileName:_jsxFileName,lineNumber:53,columnNumber:5}}));}var inputStyles=exports.inputStyles=_reactNative.StyleSheet.create({countryRow:{height:'70%',flexDirection:'row',alignItems:'center',borderRightColor:_theme.defaultColors.border6,borderRightWidth:_reactNative.StyleSheet.hairlineWidth,marginLeft:(0,_unit.pTd)(16),paddingRight:(0,_unit.pTd)(10),width:(0,_unit.pTd)(68),justifyContent:'space-between'}});