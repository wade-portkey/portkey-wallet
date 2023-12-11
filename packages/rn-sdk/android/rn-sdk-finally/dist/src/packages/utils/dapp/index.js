var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.handleAccounts=handleAccounts;exports.handleChainIds=handleChainIds;exports.handleCurrentCAInfo=handleCurrentCAInfo;exports.handleOriginInfo=handleOriginInfo;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _=require("./..");function handleCurrentCAInfo(wallet){var walletInfo=wallet.walletInfo,currentNetwork=wallet.currentNetwork;return walletInfo==null?void 0:walletInfo.caInfo[currentNetwork];}function handleChainIds(wallet){var currentCAInfo=handleCurrentCAInfo(wallet);var list=Object.entries(currentCAInfo||{}).map(function(_ref){var _ref2=(0,_slicedToArray2.default)(_ref,2),key=_ref2[0],value=_ref2[1];if(value!=null&&value.caAddress)return key;return undefined;}).filter(function(i){return!!i;});return list;}function handleAccounts(wallet){var currentCAInfo=handleCurrentCAInfo(wallet);var accounts={};Object.entries(currentCAInfo||{}).forEach(function(_ref3){var _ref4=(0,_slicedToArray2.default)(_ref3,2),key=_ref4[0],value=_ref4[1];var chainId=key;var caInfo=value;if(caInfo!=null&&caInfo.caAddress)accounts[chainId]=[(0,_.addressFormat)(caInfo.caAddress,chainId)];});return accounts;}function handleOriginInfo(_ref5){var _dapp$dappMap,_dapp$dappMap$wallet$;var wallet=_ref5.wallet,dapp=_ref5.dapp,origin=_ref5.origin;return(_dapp$dappMap=dapp.dappMap)==null?void 0:(_dapp$dappMap$wallet$=_dapp$dappMap[wallet.currentNetwork])==null?void 0:_dapp$dappMap$wallet$.find(function(item){return item.origin===origin;});}