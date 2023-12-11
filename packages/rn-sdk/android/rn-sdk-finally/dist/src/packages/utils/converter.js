var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.AmountSign=void 0;exports.divDecimals=divDecimals;exports.divDecimalsStr=divDecimalsStr;exports.divDecimalsToShow=divDecimalsToShow;exports.fixedDecimal=void 0;exports.formatAmount=formatAmount;exports.formatStr2EllipsisStr=exports.formatAmountShow=void 0;exports.formatWithCommas=formatWithCommas;exports.timesDecimals=timesDecimals;exports.unitConverter=void 0;var _misc=require("../constants/misc");var _activity=require("../constants/constants-ca/activity");var _bignumber=_interopRequireDefault(require("bignumber.js"));var enList=[{value:1e12,symbol:'T'},{value:1e9,symbol:'B'},{value:1e6,symbol:'M'},{value:1e3,symbol:'K'}];var fixedDecimal=exports.fixedDecimal=function fixedDecimal(count){var num=arguments.length>1&&arguments[1]!==undefined?arguments[1]:4;var bigCount=_bignumber.default.isBigNumber(count)?count:new _bignumber.default(count||'');if(bigCount.isNaN())return'0';return bigCount.dp(num,_bignumber.default.ROUND_DOWN).toFixed();};var unitConverter=exports.unitConverter=function unitConverter(num){var decimal=arguments.length>1&&arguments[1]!==undefined?arguments[1]:4;var defaultVal=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'0';var bigNum=_bignumber.default.isBigNumber(num)?num:new _bignumber.default(num||'');if(bigNum.isNaN()||bigNum.eq(0))return defaultVal;var abs=bigNum.abs();var list=enList;for(var i=0;i<list.length;i++){var _list$i=list[i],value=_list$i.value,symbol=_list$i.symbol;if(abs.gte(value))return fixedDecimal(bigNum.div(value),decimal)+symbol;}return fixedDecimal(bigNum,decimal);};function divDecimalsToShow(a){var decimals=arguments.length>1&&arguments[1]!==undefined?arguments[1]:8;var defaultVal=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'--';var n=divDecimals(a,decimals);return(0,_misc.isEffectiveNumber)(n)?n.toFormat():defaultVal;}function divDecimals(a){var decimals=arguments.length>1&&arguments[1]!==undefined?arguments[1]:18;if(!a)return _misc.ZERO;var bigA=_misc.ZERO.plus(a);if(bigA.isNaN())return _misc.ZERO;if(typeof decimals==='string'&&decimals.length>10)return bigA.div(decimals);return bigA.div("1e"+decimals);}function divDecimalsStr(a){var decimals=arguments.length>1&&arguments[1]!==undefined?arguments[1]:8;var defaultVal=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'--';var n=divDecimals(a,decimals);return(0,_misc.isEffectiveNumber)(n)?n.toFormat():defaultVal;}function timesDecimals(a){var decimals=arguments.length>1&&arguments[1]!==undefined?arguments[1]:18;if(!a)return _misc.ZERO;var bigA=_misc.ZERO.plus(a);if(bigA.isNaN())return _misc.ZERO;if(typeof decimals==='string'&&decimals.length>10)return bigA.times(decimals);return bigA.times("1e"+decimals);}var formatStr2EllipsisStr=exports.formatStr2EllipsisStr=function formatStr2EllipsisStr(){var address=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';var digits=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[10,10];var type=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'middle';if(!address)return'';var len=address.length;if(type==='tail')return address.slice(0,digits[0])+"...";if(len<digits[0]+digits[1])return address;var pre=address.substring(0,digits[0]);var suffix=address.substring(len-digits[1]);return pre+"..."+suffix;};var AmountSign=exports.AmountSign=function(AmountSign){AmountSign["PLUS"]="+";AmountSign["MINUS"]="-";AmountSign["USD"]="$ ";AmountSign["EMPTY"]="";return AmountSign;}({});function formatAmount(_ref){var _ref$amount=_ref.amount,amount=_ref$amount===void 0?_activity.DEFAULT_AMOUNT:_ref$amount,_ref$decimals=_ref.decimals,decimals=_ref$decimals===void 0?_activity.DEFAULT_DECIMAL:_ref$decimals,_ref$digits=_ref.digits,digits=_ref$digits===void 0?_activity.DEFAULT_DIGITS:_ref$digits,_ref$sign=_ref.sign,sign=_ref$sign===void 0?AmountSign.EMPTY:_ref$sign;var amountTrans=""+unitConverter(_misc.ZERO.plus(amount).div("1e"+(decimals||_activity.DEFAULT_DECIMAL)),digits||_activity.DEFAULT_DIGITS);if(sign&&amountTrans!=='0'){return""+sign+amountTrans;}return amountTrans;}function formatWithCommas(_ref2){var _ref2$amount=_ref2.amount,amount=_ref2$amount===void 0?_activity.DEFAULT_AMOUNT:_ref2$amount,decimals=_ref2.decimals,_ref2$digits=_ref2.digits,digits=_ref2$digits===void 0?_activity.DEFAULT_DIGITS:_ref2$digits,_ref2$sign=_ref2.sign,sign=_ref2$sign===void 0?AmountSign.EMPTY:_ref2$sign;var decimal=decimals||0;var amountTrans=""+divDecimals(_misc.ZERO.plus(amount),decimal).decimalPlaces(digits).toFormat();if(sign&&amountTrans!=='0'){return""+sign+amountTrans;}return amountTrans;}var formatAmountShow=exports.formatAmountShow=function formatAmountShow(count){var decimal=arguments.length>1&&arguments[1]!==undefined?arguments[1]:4;var roundingMode=arguments.length>2&&arguments[2]!==undefined?arguments[2]:_bignumber.default.ROUND_DOWN;var bigCount=_bignumber.default.isBigNumber(count)?count:new _bignumber.default(count||'');if(bigCount.isNaN())return'0';return bigCount.decimalPlaces(typeof decimal!=='number'?Number(decimal):decimal,roundingMode).toFormat();};