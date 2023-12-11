var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.CaHolderNftCollectionBalanceInfoDocument=void 0;exports.useCaHolderNftCollectionBalanceInfoLazyQuery=useCaHolderNftCollectionBalanceInfoLazyQuery;exports.useCaHolderNftCollectionBalanceInfoQuery=useCaHolderNftCollectionBalanceInfoQuery;var _taggedTemplateLiteralLoose2=_interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));var _client=_interopRequireWildcard(require("@apollo/client"));var Apollo=_client;var _templateObject;function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}var defaultOptions={};var CaHolderNftCollectionBalanceInfoDocument=exports.CaHolderNftCollectionBalanceInfoDocument=(0,_client.gql)(_templateObject||(_templateObject=(0,_taggedTemplateLiteralLoose2.default)(["\n  query caHolderNFTCollectionBalanceInfo($dto: GetCAHolderNFTCollectionInfoDto) {\n    caHolderNFTCollectionBalanceInfo(dto: $dto) {\n      totalRecordCount\n      data {\n        id\n        chainId\n        caAddress\n        tokenIds\n        nftCollectionInfo {\n          symbol\n          tokenContractAddress\n          decimals\n          supply\n          totalSupply\n          tokenName\n          issuer\n          isBurnable\n          issueChainId\n          imageUrl\n        }\n      }\n    }\n  }\n"])));function useCaHolderNftCollectionBalanceInfoQuery(baseOptions){var options=Object.assign({},defaultOptions,baseOptions);return Apollo.useQuery(CaHolderNftCollectionBalanceInfoDocument,options);}function useCaHolderNftCollectionBalanceInfoLazyQuery(baseOptions){var options=Object.assign({},defaultOptions,baseOptions);return Apollo.useLazyQuery(CaHolderNftCollectionBalanceInfoDocument,options);}