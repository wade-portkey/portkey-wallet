var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.doubleClick=exports.copyText=exports.checkIsSvgUrl=void 0;exports.myThrottle=myThrottle;exports.selectCurrentBackendConfig=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _CommonToast=_interopRequireDefault(require("../components/CommonToast"));var _expoClipboard=require("expo-clipboard");var _i18n=_interopRequireDefault(require("../i18n"));var _backendNetwork=require("../packages/constants/constants-ca/backend-network");function myThrottle(fn,delay){var timer;return function(_ref){var data=_ref.data;if(!timer){fn.call(this,{data:data});timer=setTimeout(function(){if(timer){clearTimeout(timer);timer=null;}},delay);}};}var doubleClick=exports.doubleClick=function doubleClick(fun,params){var interval=arguments.length>2&&arguments[2]!==undefined?arguments[2]:200;var isCalled=false;var timer;if(!isCalled){isCalled=true;timer&&clearTimeout(timer);timer=setTimeout(function(){isCalled=false;},interval);return fun(params);}};var checkIsSvgUrl=exports.checkIsSvgUrl=function checkIsSvgUrl(imgUrl){return /.svg$/.test(imgUrl);};var selectCurrentBackendConfig=exports.selectCurrentBackendConfig=function selectCurrentBackendConfig(endPointUrl){var value=Object.values(_backendNetwork.BackEndNetWorkMap).find(function(it){return endPointUrl===it.apiUrl;});if(!value)throw new Error('invalid endPointUrl');return value;};var copyText=exports.copyText=function(){var _ref2=(0,_asyncToGenerator2.default)(function*(text){try{var isCopy=yield(0,_expoClipboard.setStringAsync)(text);isCopy&&_CommonToast.default.success(_i18n.default.t('Copy Success'));}catch(_unused){_CommonToast.default.success(_i18n.default.t('Copy Fail'));}});return function copyText(_x){return _ref2.apply(this,arguments);};}();