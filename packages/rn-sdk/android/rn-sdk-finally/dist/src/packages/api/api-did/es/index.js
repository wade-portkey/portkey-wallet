Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var Method='GET';var BaseESUrl="/api/app/";var KeyList=['getUserTokenList','getChainsInfo','getRegisterResult','getRecoverResult','getContactList','getCaHolder'];var ApiObject={getUserTokenList:{target:BaseESUrl+"search/usertokenindex",config:{method:Method}},getChainsInfo:{target:BaseESUrl+"search/chainsinfoindex",config:{method:Method,params:{sort:'chainId'}}},getRegisterResult:{target:BaseESUrl+"search/accountregisterindex",config:{method:Method}},getRecoverResult:{target:BaseESUrl+"search/accountrecoverindex",config:{method:Method}},getContactList:{target:BaseESUrl+"contacts/list",config:{method:Method}},getCaHolder:{target:BaseESUrl+"search/caholderindex",config:{method:Method}}};var _default=exports.default=ApiObject;