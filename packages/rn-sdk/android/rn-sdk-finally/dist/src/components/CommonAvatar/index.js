var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=CommonAvatar;var _react=_interopRequireWildcard(require("react"));var _Svg=_interopRequireDefault(require("../Svg"));var _unit=require("../../utils/unit");var _reactNative=require("react-native");var _theme=require("../../assets/theme");var _commonUtil=require("../../utils/commonUtil");var _reactNativeSvg=require("react-native-svg");var _FastImage=_interopRequireDefault(require("../FastImage"));var _jsxFileName="/Users/fengfeiyang/aelf/portkey-wallet/packages/rn-sdk/android/rn-sdk-finally/src/components/CommonAvatar/index.tsx";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}function CommonAvatar(props){var title=props.title,svgName=props.svgName,_props$avatarSize=props.avatarSize,avatarSize=_props$avatarSize===void 0?(0,_unit.pTd)(48):_props$avatarSize,_props$style=props.style,style=_props$style===void 0?{}:_props$style,color=props.color,imageUrl=props.imageUrl,_props$shapeType=props.shapeType,shapeType=_props$shapeType===void 0?'circular':_props$shapeType,hasBorder=props.hasBorder,_props$resizeMode=props.resizeMode,resizeMode=_props$resizeMode===void 0?'contain':_props$resizeMode;var initialsTitle=String((title==null?void 0:title[0])||'').toUpperCase();var sizeStyle=(0,_react.useMemo)(function(){return{width:Number(avatarSize),height:Number(avatarSize),lineHeight:hasBorder?Number(avatarSize)-(0,_unit.pTd)(2):Number(avatarSize),borderRadius:shapeType==='square'?(0,_unit.pTd)(6):Number(avatarSize)/2};},[avatarSize,hasBorder,shapeType]);if(svgName)return _react.default.createElement(_Svg.default,{size:avatarSize,icon:svgName,color:color,iconStyle:Object.assign({},styles.avatarWrap,shapeType==='square'?styles.squareStyle:{},sizeStyle,style),__self:this,__source:{fileName:_jsxFileName,lineNumber:49,columnNumber:7}});if(imageUrl){return(0,_commonUtil.checkIsSvgUrl)(imageUrl)?_react.default.createElement(_reactNativeSvg.SvgCssUri,{uri:imageUrl,style:[styles.avatarWrap,shapeType==='square'&&styles.squareStyle,sizeStyle,style],__self:this,__source:{fileName:_jsxFileName,lineNumber:64,columnNumber:7}}):_react.default.createElement(_FastImage.default,{resizeMode:resizeMode,style:[styles.avatarWrap,shapeType==='square'&&styles.squareStyle,sizeStyle,style],source:{uri:imageUrl},__self:this,__source:{fileName:_jsxFileName,lineNumber:69,columnNumber:7}});}return _react.default.createElement(_reactNative.Text,{style:[styles.avatarWrap,shapeType==='square'&&styles.squareStyle,hasBorder&&styles.hasBorder,sizeStyle,style],__self:this,__source:{fileName:_jsxFileName,lineNumber:80,columnNumber:5}},initialsTitle);}var styles=_reactNative.StyleSheet.create({avatarWrap:{width:(0,_unit.pTd)(48),height:(0,_unit.pTd)(48),borderRadius:(0,_unit.pTd)(48),color:_theme.defaultColors.font5,backgroundColor:_theme.defaultColors.bg4,display:'flex',fontSize:(0,_unit.pTd)(20),lineHeight:'100%',overflow:'hidden',textAlign:'center'},hasBorder:{borderWidth:(0,_unit.pTd)(1),borderColor:_theme.defaultColors.border1},squareStyle:{borderRadius:(0,_unit.pTd)(6),backgroundColor:_theme.defaultColors.bg7,borderWidth:0,color:_theme.defaultColors.font7}});