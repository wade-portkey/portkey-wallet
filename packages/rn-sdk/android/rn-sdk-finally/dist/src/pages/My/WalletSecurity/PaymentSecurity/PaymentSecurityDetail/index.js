var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _react=_interopRequireWildcard(require("react"));var _PageContainer=_interopRequireDefault(require("../../../../../components/PageContainer"));var _reactNative=require("react-native");var _theme=require("../../../../../assets/theme");var _GStyles=_interopRequireDefault(require("../../../../../assets/theme/GStyles"));var _CommonButton=_interopRequireDefault(require("../../../../../components/CommonButton"));var _CommonText=require("../../../../../components/CommonText");var _styles=require("../../../../../assets/theme/styles");var _unit=require("../../../../../utils/unit");var _converter=require("../../../../../packages/utils/converter");var _handler=require("../../../../../model/contract/handler");var _Loading=_interopRequireDefault(require("../../../../../components/Loading"));var _UseBaseContainer=_interopRequireDefault(require("../../../../../model/container/UseBaseContainer"));var _entries=require("../../../../../config/entries");var _this=this,_jsxFileName="/Users/fengfeiyang/aelf/portkey-wallet/packages/rn-sdk/android/rn-sdk-finally/src/pages/My/WalletSecurity/PaymentSecurity/PaymentSecurityDetail/index.tsx";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}var PaymentSecurityDetail=function PaymentSecurityDetail(props){var transferLimitDetail=props.transferLimitDetail,containerId=props.containerId;var _useState=(0,_react.useState)(transferLimitDetail),_useState2=(0,_slicedToArray2.default)(_useState,2),detail=_useState2[0],setDetail=_useState2[1];var _useBaseContainer=(0,_UseBaseContainer.default)({entryName:_entries.PortkeyEntries.PAYMENT_SECURITY_DETAIL_ENTRY,onShow:function onShow(){getDetail();},containerId:containerId}),navigateTo=_useBaseContainer.navigateTo;var getDetail=(0,_react.useCallback)((0,_asyncToGenerator2.default)(function*(){if(!transferLimitDetail)return;_Loading.default.show();var symbol=transferLimitDetail.symbol,chainId=transferLimitDetail.chainId;try{var result=yield(0,_handler.callGetTransferLimitMethod)(chainId,symbol);if(result!=null&&result.data){setDetail(function(pre){if(pre){return Object.assign({},pre,result==null?void 0:result.data);}return pre;});}}catch(error){console.log('PaymentSecurityDetail: getTransferLimit error',error);}_Loading.default.hide();}),[transferLimitDetail]);var detailFormatted=(0,_react.useMemo)(function(){if(!detail)return undefined;return Object.assign({},detail,{singleLimit:(0,_converter.divDecimalsToShow)(detail.singleLimit,detail.decimals),dailyLimit:(0,_converter.divDecimalsToShow)(detail.dailyLimit,detail.decimals)});},[detail]);return _react.default.createElement(_PageContainer.default,{titleDom:'Transfer Settings',safeAreaColor:['blue','gray'],containerStyles:pageStyles.pageWrap,scrollViewProps:{disabled:true},__self:_this,__source:{fileName:_jsxFileName,lineNumber:67,columnNumber:5}},_react.default.createElement(_reactNative.View,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:72,columnNumber:7}},detailFormatted!=null&&detailFormatted.restricted?_react.default.createElement(_react.default.Fragment,null,_react.default.createElement(_reactNative.View,{style:pageStyles.labelWrap,__self:_this,__source:{fileName:_jsxFileName,lineNumber:75,columnNumber:13}},_react.default.createElement(_CommonText.TextM,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:76,columnNumber:15}},"Limit per Transaction"),_react.default.createElement(_CommonText.TextM,{style:_styles.FontStyles.font3,__self:_this,__source:{fileName:_jsxFileName,lineNumber:77,columnNumber:15}},((detailFormatted==null?void 0:detailFormatted.singleLimit)||'')+" "+((detailFormatted==null?void 0:detailFormatted.symbol)||''))),_react.default.createElement(_reactNative.View,{style:pageStyles.labelWrap,__self:_this,__source:{fileName:_jsxFileName,lineNumber:81,columnNumber:13}},_react.default.createElement(_CommonText.TextM,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:82,columnNumber:15}},"Daily Limit"),_react.default.createElement(_CommonText.TextM,{style:_styles.FontStyles.font3,__self:_this,__source:{fileName:_jsxFileName,lineNumber:83,columnNumber:15}},((detailFormatted==null?void 0:detailFormatted.dailyLimit)||'')+" "+((detailFormatted==null?void 0:detailFormatted.symbol)||''))),_react.default.createElement(_CommonText.TextM,{style:_styles.FontStyles.font3,__self:_this,__source:{fileName:_jsxFileName,lineNumber:87,columnNumber:13}},'Transfers exceeding the limits cannot be conducted unless you modify the limit settings first, which needs guardian approval.')):_react.default.createElement(_react.default.Fragment,null,_react.default.createElement(_reactNative.View,{style:pageStyles.labelWrap,__self:_this,__source:{fileName:_jsxFileName,lineNumber:95,columnNumber:13}},_react.default.createElement(_CommonText.TextM,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:96,columnNumber:15}},"Transfer Settings"),_react.default.createElement(_CommonText.TextM,{style:_styles.FontStyles.font3,__self:_this,__source:{fileName:_jsxFileName,lineNumber:97,columnNumber:15}},"Off")),_react.default.createElement(_CommonText.TextM,{style:_styles.FontStyles.font3,__self:_this,__source:{fileName:_jsxFileName,lineNumber:99,columnNumber:13}},'No limit for transfer'))),_react.default.createElement(_CommonButton.default,{type:"solid",onPress:function onPress(){navigateTo(_entries.PortkeyEntries.PAYMENT_SECURITY_EDIT_ENTRY,{params:{transferLimitDetail:detail}});},__self:_this,__source:{fileName:_jsxFileName,lineNumber:103,columnNumber:7}},"Edit"));};var pageStyles=_reactNative.StyleSheet.create({pageWrap:Object.assign({flex:1,backgroundColor:_theme.defaultColors.bg4,justifyContent:'space-between'},_GStyles.default.paddingArg(24,20,18)),labelWrap:{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:(0,_unit.pTd)(16),backgroundColor:_theme.defaultColors.bg1,marginBottom:(0,_unit.pTd)(24),height:(0,_unit.pTd)(56),alignItems:'center',borderRadius:(0,_unit.pTd)(6)}});var _default=exports.default=PaymentSecurityDetail;