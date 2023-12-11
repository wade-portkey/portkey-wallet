var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.useCheckManager=useCheckManager;exports.useIntervalQueryCAInfoByAddress=useIntervalQueryCAInfoByAddress;var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _useInterval=_interopRequireDefault(require("../useInterval"));var _graphql=require("../../graphql");var _react=require("react");var _verifier=require("../../types/verifier");var _wallet=require("./wallet");var _useLockCallback=_interopRequireDefault(require("../useLockCallback"));var _chainList=require("./chainList");var _network=require("../../constants/constants-ca/network");var _=require("./..");function useIntervalQueryCAInfoByAddress(network,address,validateManager){var _useState=(0,_react.useState)(),_useState2=(0,_slicedToArray2.default)(_useState,2),info=_useState2[0],setInfo=_useState2[1];var getChainInfo=(0,_chainList.useGetChainInfo)();var caInfo=(0,_react.useMemo)(function(){return address&&info?info==null?void 0:info[address+network]:undefined;},[address,info,network]);(0,_useInterval.default)((0,_asyncToGenerator2.default)(function*(){if(!address||caInfo)return;try{var _info;var _yield$contractQuerie=yield _graphql.contractQueries.getCAHolderByManager(network,{manager:address}),caHolderManagerInfo=_yield$contractQuerie.caHolderManagerInfo;_info=caHolderManagerInfo[0];if(!_info)return;if(_info.originChainId!==_info.chainId){var _yield$contractQuerie2=yield _graphql.contractQueries.getCAHolderByManager(network,{caHash:_info.caHash,chainId:_info.originChainId}),_caHolderManagerInfo=_yield$contractQuerie2.caHolderManagerInfo;_info=_caHolderManagerInfo[0];}var _info2=_info,caAddress=_info2.caAddress,caHash=_info2.caHash,loginGuardianInfo=_info2.loginGuardianInfo,_info2$originChainId=_info2.originChainId,originChainId=_info2$originChainId===void 0?_network.DefaultChainId:_info2$originChainId;if(caAddress&&caHash&&loginGuardianInfo[0]&&originChainId){var _loginGuardianInfo$0$,_loginGuardianInfo$0$2;var guardianList=loginGuardianInfo.filter(function(item){return(item==null?void 0:item.chainId)===originChainId;});if(guardianList.length===0)return;if(validateManager){var validate=yield validateManager({chainId:originChainId,caHash:caHash,address:address});if(!validate)return;}yield getChainInfo(originChainId);setInfo((0,_defineProperty2.default)({},address+network,{caInfo:(0,_defineProperty2.default)({originChainId:originChainId,managerInfo:{managerUniqueId:loginGuardianInfo[0].id,loginAccount:(_loginGuardianInfo$0$=loginGuardianInfo[0].loginGuardian)==null?void 0:_loginGuardianInfo$0$.identifierHash,type:(_loginGuardianInfo$0$2=loginGuardianInfo[0].loginGuardian)==null?void 0:_loginGuardianInfo$0$2.type,verificationType:_verifier.VerificationType.addManager}},originChainId,{caAddress:caAddress,caHash:caHash}),originChainId:originChainId}));}}catch(error){console.log(error,'=====error');}}),3000,[caInfo,network,address,validateManager]);return caInfo;}function useCheckManager(callback){var _useCurrentWallet=(0,_wallet.useCurrentWallet)(),walletInfo=_useCurrentWallet.walletInfo,currentNetwork=_useCurrentWallet.currentNetwork;var _ref2=walletInfo||{},caHash=_ref2.caHash,address=_ref2.address;var originChainId=(0,_wallet.useOriginChainId)();var savedCallback=(0,_.useLatestRef)(callback);var checkManager=(0,_useLockCallback.default)((0,_asyncToGenerator2.default)(function*(){try{if(!caHash)return;var info=yield _graphql.contractQueries.getCAHolderManagerInfo(currentNetwork,{dto:{caHash:caHash,maxResultCount:1,skipCount:0,chainId:originChainId}});var _ref4=info.data||{},caHolderManagerInfo=_ref4.caHolderManagerInfo;if(caHolderManagerInfo){var _ref5=caHolderManagerInfo[0]||{},managerInfos=_ref5.managerInfos;var isManager=managerInfos==null?void 0:managerInfos.some(function(manager){return(manager==null?void 0:manager.address)===address;});if(!isManager)savedCallback.current==null?void 0:savedCallback.current();}}catch(error){console.log(error,'=====error');}}),[caHash,address,originChainId]);var interval=(0,_useInterval.default)(function(){checkManager();},5000,[checkManager]);(0,_react.useEffect)(function(){if(!caHash||!address){interval.remove();}else{interval.start();}},[caHash,address,interval]);}