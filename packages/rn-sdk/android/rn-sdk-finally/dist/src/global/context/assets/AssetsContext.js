var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _bignumber=_interopRequireDefault(require("bignumber.js"));var _react=require("react");var AssetsContext=(0,_react.createContext)({balanceList:[],updateBalanceList:function(){var _updateBalanceList=(0,_asyncToGenerator2.default)(function*(){});function updateBalanceList(){return _updateBalanceList.apply(this,arguments);}return updateBalanceList;}(),tokenPrices:[],updateTokenPrices:function(){var _updateTokenPrices=(0,_asyncToGenerator2.default)(function*(){});function updateTokenPrices(){return _updateTokenPrices.apply(this,arguments);}return updateTokenPrices;}(),allOfTokensList:[],updateTokensList:function(){var _updateTokensList=(0,_asyncToGenerator2.default)(function*(){});function updateTokensList(){return _updateTokensList.apply(this,arguments);}return updateTokensList;}(),balanceUSD:new _bignumber.default(0),nftCollections:[],updateNftCollections:function(){var _updateNftCollections=(0,_asyncToGenerator2.default)(function*(){});function updateNftCollections(){return _updateNftCollections.apply(this,arguments);}return updateNftCollections;}()});var _default=exports.default=AssetsContext;