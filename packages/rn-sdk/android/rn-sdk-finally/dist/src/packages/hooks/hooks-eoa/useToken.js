Object.defineProperty(exports,"__esModule",{value:true});exports.useToken=exports.useMarketTokenListInCurrentChain=exports.useIsFetchingTokenList=exports.useCurrentAccountTokenList=exports.useAllAccountTokenList=exports.default=void 0;var _=require("./..");var _action=require("packages/types/token/action");var _slice=require("packages/types/token/slice");var _react=require("react");var useToken=exports.useToken=function useToken(){var dispatch=(0,_.useAppCommonDispatch)();var _useAppEOASelector=(0,_.useAppEOASelector)(function(state){return state.chain;}),currentChain=_useAppEOASelector.currentChain;var _useAppEOASelector2=(0,_.useAppEOASelector)(function(state){return state.wallet;}),currentAccount=_useAppEOASelector2.currentAccount;var tokenState=(0,_.useAppEOASelector)(function(state){return state.token;});var addToken=function addToken(tokenItem){if(!currentAccount)return;dispatch((0,_action.addTokenInCurrentAccount)({tokenItem:tokenItem,currentChain:currentChain,currentAccount:currentAccount}));};var deleteToken=function deleteToken(tokenItem){if(!currentAccount)return;dispatch((0,_action.deleteTokenInCurrentAccount)({tokenItem:tokenItem,currentChain:currentChain,currentAccount:currentAccount}));};var fetchTokenList=function fetchTokenList(params){dispatch((0,_slice.fetchTokenListAsync)(Object.assign({},params,{currentChain:currentChain,currentAccount:currentAccount})));};var tokenStoreFuncs={addToken:addToken,deleteToken:deleteToken,fetchTokenList:fetchTokenList};return[tokenState,tokenStoreFuncs];};var useCurrentAccountTokenList=exports.useCurrentAccountTokenList=function useCurrentAccountTokenList(){var dispatch=(0,_.useAppCommonDispatch)();var _useAppEOASelector3=(0,_.useAppEOASelector)(function(state){return state.chain;}),currentChain=_useAppEOASelector3.currentChain;var _useAppEOASelector4=(0,_.useAppEOASelector)(function(state){return state.wallet;}),currentAccount=_useAppEOASelector4.currentAccount;var _useAppEOASelector5=(0,_.useAppEOASelector)(function(state){return state.token;}),addedTokenData=_useAppEOASelector5.addedTokenData,isFetchingTokenList=_useAppEOASelector5.isFetchingTokenList;return(0,_react.useMemo)(function(){if((currentChain==null?void 0:currentChain.rpcUrl)in addedTokenData&&currentAccount&&(currentAccount==null?void 0:currentAccount.address)in addedTokenData[currentChain==null?void 0:currentChain.rpcUrl]){return addedTokenData[currentChain==null?void 0:currentChain.rpcUrl][currentAccount==null?void 0:currentAccount.address];}if(!isFetchingTokenList){dispatch((0,_slice.fetchTokenListAsync)({pageNo:1,pageSize:10000,currentChain:currentChain,currentAccount:currentAccount}));}return[];},[addedTokenData,currentChain,currentAccount]);};var useAllAccountTokenList=exports.useAllAccountTokenList=function useAllAccountTokenList(){var _useAppEOASelector6=(0,_.useAppEOASelector)(function(state){return state.token;}),addedTokenData=_useAppEOASelector6.addedTokenData;return(0,_react.useMemo)(function(){return addedTokenData;},[addedTokenData]);};var useMarketTokenListInCurrentChain=exports.useMarketTokenListInCurrentChain=function useMarketTokenListInCurrentChain(){var _useAppEOASelector7=(0,_.useAppEOASelector)(function(state){return state.token;}),tokenDataShowInMarket=_useAppEOASelector7.tokenDataShowInMarket;return(0,_react.useMemo)(function(){return tokenDataShowInMarket;},[tokenDataShowInMarket]);};var useIsFetchingTokenList=exports.useIsFetchingTokenList=function useIsFetchingTokenList(){var _useAppEOASelector8=(0,_.useAppEOASelector)(function(state){return state.token;}),isFetchingTokenList=_useAppEOASelector8.isFetchingTokenList;return(0,_react.useMemo)(function(){return isFetchingTokenList;},[isFetchingTokenList]);};var _default=exports.default=useToken;