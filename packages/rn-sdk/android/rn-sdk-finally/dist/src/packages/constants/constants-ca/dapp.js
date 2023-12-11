var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.SessionKeyMap=exports.SessionKeyArray=exports.REMEMBER_ME_ACTION_WHITELIST=exports.DefaultDapp=exports.CA_METHOD_WHITELIST=void 0;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _session=require("../../types/session");var _providerTypes=require("@portkey/provider-types");var SessionKeyMap=exports.SessionKeyMap=(0,_defineProperty2.default)((0,_defineProperty2.default)((0,_defineProperty2.default)((0,_defineProperty2.default)((0,_defineProperty2.default)({},_session.SessionExpiredPlan.hour1,'1 hour'),_session.SessionExpiredPlan.hour3,'3 hours'),_session.SessionExpiredPlan.hour12,'12 hours'),_session.SessionExpiredPlan.hour24,'24 hours'),_session.SessionExpiredPlan.always,'Never');var SessionKeyArray=exports.SessionKeyArray=Object.entries(SessionKeyMap).map(function(_ref){var _ref2=(0,_slicedToArray2.default)(_ref,2),k=_ref2[0],v=_ref2[1];return{value:k===_session.SessionExpiredPlan.always?k:Number(k),label:v,children:v};});var CA_METHOD_WHITELIST=exports.CA_METHOD_WHITELIST=['ManagerForwardCall','ManagerTransfer'];var REMEMBER_ME_ACTION_WHITELIST=exports.REMEMBER_ME_ACTION_WHITELIST=[_providerTypes.MethodsBase.SEND_TRANSACTION];var DefaultDapp=exports.DefaultDapp={origin:'default'};