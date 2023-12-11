var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=exports.Popover=void 0;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _react=_interopRequireWildcard(require("react"));var _reactNative=require("react-native");var _CommonText=require("../CommonText");var _theme=require("../../assets/theme");var _unit=require("../../utils/unit");var _jsxFileName="/Users/fengfeiyang/aelf/portkey-wallet/packages/rn-sdk/android/rn-sdk-finally/src/components/IndexBar/index.tsx";function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}var Popover=exports.Popover=(0,_react.forwardRef)(function Popover(_,_ref){var _useState=(0,_react.useState)(),_useState2=(0,_slicedToArray2.default)(_useState,2),show=_useState2[0],setShow=_useState2[1];var _useState3=(0,_react.useState)(),_useState4=(0,_slicedToArray2.default)(_useState3,2),popoverInfo=_useState4[0],setPopoverInfo=_useState4[1];var marginTop=(0,_react.useRef)(new _reactNative.Animated.Value(0)).current;var onSetPopoverInfo=(0,_react.useCallback)(function(info){if(!info)return;marginTop.setValue(info.top-(styles.popover.height-info.indexHeight)/2);setPopoverInfo(info);},[marginTop]);(0,_react.useImperativeHandle)(_ref,function(){return{setPopoverInfo:onSetPopoverInfo,setShow:setShow};},[onSetPopoverInfo]);if(!popoverInfo||!popoverInfo.text||!show)return null;return _react.default.createElement(_reactNative.Animated.View,{style:[styles.popover,{marginTop:marginTop}],__self:this,__source:{fileName:_jsxFileName,lineNumber:68,columnNumber:5}},_react.default.createElement(_CommonText.TextL,{style:[styles.popoverItem],__self:this,__source:{fileName:_jsxFileName,lineNumber:69,columnNumber:7}},popoverInfo.text));});var IndexBarItem=(0,_react.memo)(function IndexBarItem(_ref2){var style=_ref2.style,indexTextStyle=_ref2.indexTextStyle,indexWrapSelectStyle=_ref2.indexWrapSelectStyle,indexTextSelectStyle=_ref2.indexTextSelectStyle,indexWrapStyle=_ref2.indexWrapStyle,text=_ref2.text,_ref2$isSelected=_ref2.isSelected,isSelected=_ref2$isSelected===void 0?false:_ref2$isSelected;return _react.default.createElement(_reactNative.View,{style:[style],__self:this,__source:{fileName:_jsxFileName,lineNumber:93,columnNumber:7}},_react.default.createElement(_reactNative.View,{style:[indexWrapStyle,isSelected&&indexWrapSelectStyle],__self:this,__source:{fileName:_jsxFileName,lineNumber:94,columnNumber:9}},_react.default.createElement(_CommonText.TextS,{style:[styles.indexTextStyle,indexTextStyle,isSelected&&indexTextSelectStyle],__self:this,__source:{fileName:_jsxFileName,lineNumber:95,columnNumber:11}},text)));},function(prevPros,nextProps){return prevPros.isSelected===nextProps.isSelected&&prevPros.text===nextProps.text;});var IndexBar=(0,_react.forwardRef)(function IndexBar(_ref3,forwardedRef){var _this=this;var style=_ref3.style,data=_ref3.data,indexBarItemStyle=_ref3.indexBarItemStyle,indexTextStyle=_ref3.indexTextStyle,onPress=_ref3.onPress,showPopover=_ref3.showPopover,_ref3$disableIndexSel=_ref3.disableIndexSelect,disableIndexSelect=_ref3$disableIndexSel===void 0?false:_ref3$disableIndexSel;var indexInfoRef=(0,_react.useRef)();var indexRef=(0,_react.useRef)(null);var popoverRef=(0,_react.useRef)();var dataLength=(0,_react.useRef)(0);var _useState5=(0,_react.useState)(0),_useState6=(0,_slicedToArray2.default)(_useState5,2),outsideSelectIndex=_useState6[0],setOutsideSelectIndex=_useState6[1];var _useState7=(0,_react.useState)(-1),_useState8=(0,_slicedToArray2.default)(_useState7,2),scrollSelectIndex=_useState8[0],setScrollSelectIndex=_useState8[1];var getIndex=(0,_react.useCallback)(function(nativePageY){if(!indexInfoRef.current)return;var _indexInfoRef$current=indexInfoRef.current,pageY=_indexInfoRef$current.pageY,height=_indexInfoRef$current.height,indexHeight=_indexInfoRef$current.indexHeight;var nativeClientY=nativePageY-pageY;if(nativeClientY<0||nativeClientY>height)return;return Math.floor(nativeClientY/indexHeight);},[]);var selectIndex=(0,_react.useMemo)(function(){return scrollSelectIndex!==-1?scrollSelectIndex:outsideSelectIndex;},[outsideSelectIndex,scrollSelectIndex]);(0,_react.useImperativeHandle)(forwardedRef,function(){return{setSelectIndex:setOutsideSelectIndex};},[]);var setCurrentIndex=(0,_react.useCallback)(function(nativePageY){if(!indexInfoRef.current)return;var _indexInfoRef$current2=indexInfoRef.current,currentIndex=_indexInfoRef$current2.currentIndex,indexHeight=_indexInfoRef$current2.indexHeight;var nowIndex=getIndex(nativePageY);if(nowIndex!==undefined&&nowIndex!==currentIndex){var _popoverRef$current;indexInfoRef.current.currentIndex=nowIndex;onPress==null?void 0:onPress(nowIndex);(_popoverRef$current=popoverRef.current)==null?void 0:_popoverRef$current.setPopoverInfo({top:nowIndex*indexHeight,text:data[nowIndex],indexHeight:indexHeight});setScrollSelectIndex(nowIndex);}},[data,getIndex,onPress]);var onPanResponderStart=(0,_react.useCallback)(function(){var _ref4=(0,_asyncToGenerator2.default)(function*(evt){var eventPageY=evt.nativeEvent.pageY;if(indexInfoRef.current&&dataLength.current===data.length){indexInfoRef.current.currentIndex=-1;}else{var _yield$Promise=yield new Promise(function(resolve,reject){if(indexRef.current===null){reject('no indexRef');return;}indexRef.current.measure(function(_x,_y,_width,_height,_pageX,_pageY){resolve({height:_height,pageX:_pageX,pageY:_pageY,indexHeight:_height/data.length});});}),height=_yield$Promise.height,pageX=_yield$Promise.pageX,pageY=_yield$Promise.pageY,indexHeight=_yield$Promise.indexHeight;indexInfoRef.current={height:height,pageX:pageX,pageY:pageY,indexHeight:indexHeight,currentIndex:-1};dataLength.current=data.length;}setCurrentIndex(eventPageY);});return function(_x2){return _ref4.apply(this,arguments);};}(),[data,setCurrentIndex]);var panResponder=(0,_react.useMemo)(function(){return _reactNative.PanResponder.create({onStartShouldSetPanResponder:function onStartShouldSetPanResponder(){return true;},onMoveShouldSetPanResponder:function onMoveShouldSetPanResponder(){return true;},onPanResponderStart:onPanResponderStart,onPanResponderMove:function onPanResponderMove(evt){var _popoverRef$current2;(_popoverRef$current2=popoverRef.current)==null?void 0:_popoverRef$current2.setShow(true);setCurrentIndex(evt.nativeEvent.pageY);},onPanResponderEnd:function onPanResponderEnd(){var _popoverRef$current3,_popoverRef$current4;(_popoverRef$current3=popoverRef.current)==null?void 0:_popoverRef$current3.setPopoverInfo(undefined);(_popoverRef$current4=popoverRef.current)==null?void 0:_popoverRef$current4.setShow(false);setScrollSelectIndex(-1);}});},[onPanResponderStart,setCurrentIndex]);var indexBarItem=(0,_react.useCallback)(function(item,index){return _react.default.createElement(IndexBarItem,{key:index,isSelected:!disableIndexSelect&&selectIndex===index,style:[styles.indexBarItemStyle,indexBarItemStyle],indexTextStyle:indexTextStyle,indexWrapStyle:styles.indexWrapStyle,indexWrapSelectStyle:styles.indexWrapSelectStyle,indexTextSelectStyle:styles.indexTextSelectStyle,text:item,__self:_this,__source:{fileName:_jsxFileName,lineNumber:208,columnNumber:9}});},[disableIndexSelect,indexBarItemStyle,indexTextStyle,selectIndex]);return _react.default.createElement(_reactNative.View,(0,_extends2.default)({style:[styles.barBox,style],ref:indexRef},panResponder.panHandlers,{__self:this,__source:{fileName:_jsxFileName,lineNumber:224,columnNumber:5}}),showPopover&&_react.default.createElement(Popover,{ref:popoverRef,__self:this,__source:{fileName:_jsxFileName,lineNumber:225,columnNumber:23}}),data==null?void 0:data.map(indexBarItem));});var _default=exports.default=IndexBar;var styles=_reactNative.StyleSheet.create({indexTextStyle:{color:_theme.defaultColors.font3,width:(0,_unit.pTd)(15),height:(0,_unit.pTd)(15),lineHeight:(0,_unit.pTd)(15),textAlign:'center'},indexBarItemStyle:{flex:1,width:20,justifyContent:'center',alignItems:'center'},popover:{position:'absolute',right:30,height:50,width:50,borderRadius:25,alignItems:'center',justifyContent:'center',overflow:'hidden',backgroundColor:_theme.defaultColors.bg6},popoverItem:{},barBox:{position:'absolute',right:(0,_unit.pTd)(4)},indexWrapStyle:{width:(0,_unit.pTd)(15),height:(0,_unit.pTd)(15),borderRadius:(0,_unit.pTd)(7.5),overflow:'hidden'},indexWrapSelectStyle:{backgroundColor:_theme.defaultColors.bg5},indexTextSelectStyle:{color:_theme.defaultColors.font11}});