var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.TextXXXL=exports.TextXXL=exports.TextXL=exports.TextTitle=exports.TextS=exports.TextM=exports.TextL=exports.PrimaryText=void 0;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _theme=require("../../assets/theme");var _fonts=_interopRequireDefault(require("../../assets/theme/fonts"));var _react=_interopRequireDefault(require("react"));var _reactNative=require("react-native");var _unit=require("../../utils/unit");var _this=this,_jsxFileName="/Users/fengfeiyang/aelf/portkey-wallet/packages/rn-sdk/android/rn-sdk-finally/src/components/CommonText/index.tsx";var styles=_reactNative.StyleSheet.create({TextS:{color:_theme.defaultColors.font5,fontSize:(0,_unit.pTd)(12)},TextM:{color:_theme.defaultColors.font5,fontSize:(0,_unit.pTd)(14)},TextL:{color:_theme.defaultColors.font5,fontSize:(0,_unit.pTd)(16)},TextXL:{color:_theme.defaultColors.font5,fontSize:(0,_unit.pTd)(18)},TextXXL:{color:_theme.defaultColors.font5,fontSize:(0,_unit.pTd)(20)},TextXXXL:Object.assign({color:_theme.defaultColors.font5,fontSize:(0,_unit.pTd)(24)},_fonts.default.mediumFont),TextTitle:Object.assign({color:_theme.defaultColors.font5,fontSize:(0,_unit.pTd)(18)},_fonts.default.mediumFont),PrimaryText:{color:_theme.defaultColors.primaryColor,fontSize:(0,_unit.pTd)(16)}});var obj={};Object.entries(styles).map(function(_ref){var _ref2=(0,_slicedToArray2.default)(_ref,2),key=_ref2[0],value=_ref2[1];obj[key]=function(props){return _react.default.createElement(_reactNative.Text,(0,_extends2.default)({},props,{style:[value,props.style],__self:_this,__source:{fileName:_jsxFileName,lineNumber:49,columnNumber:7}}),props.children);};});var _ref3=obj,TextS=exports.TextS=_ref3.TextS,TextM=exports.TextM=_ref3.TextM,TextL=exports.TextL=_ref3.TextL,TextXL=exports.TextXL=_ref3.TextXL,TextXXL=exports.TextXXL=_ref3.TextXXL,TextXXXL=exports.TextXXXL=_ref3.TextXXXL,TextTitle=exports.TextTitle=_ref3.TextTitle,PrimaryText=exports.PrimaryText=_ref3.PrimaryText;