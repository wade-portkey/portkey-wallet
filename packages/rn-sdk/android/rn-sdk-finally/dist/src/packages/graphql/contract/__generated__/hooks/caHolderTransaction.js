var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.CaHolderTransactionDocument=void 0;exports.useCaHolderTransactionLazyQuery=useCaHolderTransactionLazyQuery;exports.useCaHolderTransactionQuery=useCaHolderTransactionQuery;var _taggedTemplateLiteralLoose2=_interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));var _client=_interopRequireWildcard(require("@apollo/client"));var Apollo=_client;var _templateObject;function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}var defaultOptions={};var CaHolderTransactionDocument=exports.CaHolderTransactionDocument=(0,_client.gql)(_templateObject||(_templateObject=(0,_taggedTemplateLiteralLoose2.default)(["\n  query caHolderTransaction($dto: GetCAHolderTransactionDto) {\n    caHolderTransaction(dto: $dto) {\n      totalRecordCount\n      data {\n        id\n        chainId\n        blockHash\n        blockHeight\n        previousBlockHash\n        transactionId\n        methodName\n        tokenInfo {\n          id\n          chainId\n          blockHash\n          blockHeight\n          previousBlockHash\n          symbol\n          type\n          tokenContractAddress\n          decimals\n          totalSupply\n          tokenName\n          issuer\n          isBurnable\n          issueChainId\n        }\n        nftInfo {\n          symbol\n          tokenContractAddress\n          decimals\n          supply\n          totalSupply\n          tokenName\n          issuer\n          isBurnable\n          issueChainId\n          imageUrl\n          collectionSymbol\n          collectionName\n        }\n        status\n        timestamp\n        transferInfo {\n          fromAddress\n          fromCAAddress\n          toAddress\n          amount\n          fromChainId\n          toChainId\n          transferTransactionId\n        }\n        fromAddress\n        transactionFees {\n          symbol\n          amount\n        }\n      }\n    }\n  }\n"])));function useCaHolderTransactionQuery(baseOptions){var options=Object.assign({},defaultOptions,baseOptions);return Apollo.useQuery(CaHolderTransactionDocument,options);}function useCaHolderTransactionLazyQuery(baseOptions){var options=Object.assign({},defaultOptions,baseOptions);return Apollo.useLazyQuery(CaHolderTransactionDocument,options);}