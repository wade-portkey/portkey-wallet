var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.encryptLocal=exports.encrypt=exports.decrypt=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _cryptoJs=_interopRequireDefault(require("crypto-js"));var expoCrypto=_interopRequireWildcard(require("expo-crypto"));function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}var encrypt=exports.encrypt=function encrypt(data,key){return _cryptoJs.default.AES.encrypt(data,key).toString();};var decrypt=exports.decrypt=function decrypt(data,key){return _cryptoJs.default.AES.decrypt(data,key).toString(_cryptoJs.default.enc.Utf8);};var encryptLocal=exports.encryptLocal=function(){var _ref=(0,_asyncToGenerator2.default)(function*(data){return yield expoCrypto.digestStringAsync(expoCrypto.CryptoDigestAlgorithm.SHA256,data);});return function encryptLocal(_x){return _ref.apply(this,arguments);};}();