var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.NetworkTestCases=void 0;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _wallet=require("../model/wallet");var _controller=require("../network/controller");var _crypto=require("../utils/crypto");var NetworkTestCases=exports.NetworkTestCases=[{describe:'GetNetworkInfo',run:function(){var _run=(0,_asyncToGenerator2.default)(function*(testContext){var it=yield _controller.NetworkController.getNetworkInfo();testContext.assert(it.totalCount>0,'totalCount should be greater than 0');});function run(_x){return _run.apply(this,arguments);}return run;}()},{describe:'EncryptLocal',run:function(){var _run2=(0,_asyncToGenerator2.default)(function*(testContext){var msg='i-am-error';var decrypted=yield(0,_crypto.encryptLocal)(yield(0,_crypto.encryptLocal)(msg));console.log('decrypted',decrypted);testContext.assert(msg===decrypted,'msg should be the same after 2 times encryptLocal');});function run(_x2){return _run2.apply(this,arguments);}return run;}()},{describe:'run GetTokenPrice well',run:function(){var _run3=(0,_asyncToGenerator2.default)(function*(testContext){var it=yield _controller.NetworkController.checkELFTokenPrice();testContext.assert(!!it,'it should not be falsy');testContext.log(it,'getTokenPrice result');});function run(_x3){return _run3.apply(this,arguments);}return run;}()},{describe:'run getTokenInfo well',run:function(){var _run4=(0,_asyncToGenerator2.default)(function*(testContext){var it=yield _controller.NetworkController.searchTokenList();testContext.assert(!!it,'it should not be falsy');testContext.log(it,'getTokenInfo result');});function run(_x4){return _run4.apply(this,arguments);}return run;}()},{describe:'get multi ca addresses well',run:function(){var _run5=(0,_asyncToGenerator2.default)(function*(testContext){var wallet=yield(0,_wallet.getUnlockedWallet)({getMultiCaAddresses:true});testContext.assert(!!wallet,'wallet should not be falsy');testContext.log(wallet,'wallet');});function run(_x5){return _run5.apply(this,arguments);}return run;}()},{describe:'get account balance well',run:function(){var _run6=(0,_asyncToGenerator2.default)(function*(testContext){var wallet=yield(0,_wallet.getUnlockedWallet)({getMultiCaAddresses:true});var it=yield _controller.NetworkController.fetchUserTokenBalance({maxResultCount:100,skipCount:0,caAddressInfos:Object.entries(wallet.multiCaAddresses).map(function(_ref){var _ref2=(0,_slicedToArray2.default)(_ref,2),chainId=_ref2[0],caAddress=_ref2[1];return{chainId:chainId,caAddress:caAddress};})});testContext.assert(!!it,'it should not be falsy');testContext.log(it,'getAccountBalance result');});function run(_x6){return _run6.apply(this,arguments);}return run;}()},{describe:'get nft collections well',run:function(){var _run7=(0,_asyncToGenerator2.default)(function*(testContext){var _it$data$;var wallet=yield(0,_wallet.getUnlockedWallet)({getMultiCaAddresses:true});var it=yield _controller.NetworkController.fetchNetCollections({maxResultCount:100,skipCount:0,caAddressInfos:Object.entries(wallet.multiCaAddresses).map(function(_ref3){var _ref4=(0,_slicedToArray2.default)(_ref3,2),chainId=_ref4[0],caAddress=_ref4[1];return{chainId:chainId,caAddress:caAddress};})});testContext.assert(!!it,'it should not be falsy');testContext.log(it,'getNftCollections result');var symbol=(_it$data$=it.data[0])==null?void 0:_it$data$.symbol;if(symbol){var them=yield _controller.NetworkController.fetchParticularNftItemList({maxResultCount:100,skipCount:0,symbol:symbol,caAddressInfos:Object.entries(wallet.multiCaAddresses).map(function(_ref5){var _ref6=(0,_slicedToArray2.default)(_ref5,2),chainId=_ref6[0],caAddress=_ref6[1];return{chainId:chainId,caAddress:caAddress};})});testContext.assert(!!them,'nft items info should not be falsy');testContext.log(them,'getNftItems result');}});function run(_x7){return _run7.apply(this,arguments);}return run;}(),useDetailsReport:true}];