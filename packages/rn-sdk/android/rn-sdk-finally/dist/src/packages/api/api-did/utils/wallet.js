var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.setWalletName=exports.requestCreateWallet=exports.registerDIDWallet=exports.recoveryDIDWallet=exports.fetchCreateWalletResult=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _verifier=require("../../../types/verifier");var _=require("./..");var registerDIDWallet=exports.registerDIDWallet=function(){var _ref=(0,_asyncToGenerator2.default)(function*(params){var baseUrl=params.baseUrl;delete params.baseUrl;return _.request.wallet.requestRegister({baseURL:baseUrl,params:params});});return function registerDIDWallet(_x){return _ref.apply(this,arguments);};}();var recoveryDIDWallet=exports.recoveryDIDWallet=function(){var _ref2=(0,_asyncToGenerator2.default)(function*(params){var baseURL=params.baseURL;delete params.baseURL;return _.request.wallet.recoveryWallet({baseURL:baseURL,params:params});});return function recoveryDIDWallet(_x2){return _ref2.apply(this,arguments);};}();var requestCreateWallet=exports.requestCreateWallet=function(){var _ref4=(0,_asyncToGenerator2.default)(function*(_ref3){var baseURL=_ref3.baseURL,verificationType=_ref3.verificationType,managerUniqueId=_ref3.managerUniqueId;var fetch=_.request.es.getRegisterResult;if(verificationType!==_verifier.VerificationType.register)fetch=_.request.es.getRecoverResult;var req=yield fetch({baseURL:baseURL,params:{filter:"_id:"+managerUniqueId}});var result=req.items[0];return result;});return function requestCreateWallet(_x3){return _ref4.apply(this,arguments);};}();var setWalletName=exports.setWalletName=function setWalletName(_ref5){var nickname=_ref5.nickname,_ref5$baseURL=_ref5.baseURL,baseURL=_ref5$baseURL===void 0?'':_ref5$baseURL;return _.request.wallet.setWalletName({baseURL:baseURL,params:{nickname:nickname}});};var fetchCreateWalletResult=exports.fetchCreateWalletResult=function(){var _ref7=(0,_asyncToGenerator2.default)(function*(_ref6){var baseUrl=_ref6.baseUrl,type=_ref6.type,managerUniqueId=_ref6.managerUniqueId,loginGuardianType=_ref6.loginGuardianType,verificationType=_ref6.verificationType;var tmpFetch;switch(verificationType){case _verifier.VerificationType.register:tmpFetch=_.request.wallet.queryRegister;break;case _verifier.VerificationType.communityRecovery:tmpFetch=_.request.wallet.queryRecovery;break;default:throw Error('Unable to find the corresponding api');}return yield tmpFetch({baseURL:baseUrl,params:{type:type,managerUniqueId:managerUniqueId,loginGuardianType:loginGuardianType}});});return function fetchCreateWalletResult(_x4){return _ref7.apply(this,arguments);};}();