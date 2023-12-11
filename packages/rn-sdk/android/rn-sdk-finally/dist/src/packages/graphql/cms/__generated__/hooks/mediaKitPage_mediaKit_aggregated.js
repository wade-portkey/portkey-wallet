var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.MediaKitPage_MediaKit_AggregatedDocument=void 0;exports.useMediaKitPage_MediaKit_AggregatedLazyQuery=useMediaKitPage_MediaKit_AggregatedLazyQuery;exports.useMediaKitPage_MediaKit_AggregatedQuery=useMediaKitPage_MediaKit_AggregatedQuery;var _taggedTemplateLiteralLoose2=_interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));var _client=_interopRequireWildcard(require("@apollo/client"));var Apollo=_client;var _templateObject;function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}var defaultOptions={};var MediaKitPage_MediaKit_AggregatedDocument=exports.MediaKitPage_MediaKit_AggregatedDocument=(0,_client.gql)(_templateObject||(_templateObject=(0,_taggedTemplateLiteralLoose2.default)(["\n  query mediaKitPage_mediaKit_aggregated(\n    $groupBy: [String]\n    $filter: mediaKitPage_mediaKit_filter\n    $limit: Int\n    $offset: Int\n    $page: Int\n    $search: String\n    $sort: [String]\n  ) {\n    mediaKitPage_mediaKit_aggregated(\n      groupBy: $groupBy\n      filter: $filter\n      limit: $limit\n      offset: $offset\n      page: $page\n      search: $search\n      sort: $sort\n    ) {\n      group\n      countAll\n      count {\n        id\n        mediaKit_id\n        mediaKitPage_id\n      }\n      countDistinct {\n        id\n        mediaKit_id\n        mediaKitPage_id\n      }\n      avg {\n        id\n        mediaKit_id\n        mediaKitPage_id\n      }\n      sum {\n        id\n        mediaKit_id\n        mediaKitPage_id\n      }\n      avgDistinct {\n        id\n        mediaKit_id\n        mediaKitPage_id\n      }\n      sumDistinct {\n        id\n        mediaKit_id\n        mediaKitPage_id\n      }\n      min {\n        id\n        mediaKit_id\n        mediaKitPage_id\n      }\n      max {\n        id\n        mediaKit_id\n        mediaKitPage_id\n      }\n    }\n  }\n"])));function useMediaKitPage_MediaKit_AggregatedQuery(baseOptions){var options=Object.assign({},defaultOptions,baseOptions);return Apollo.useQuery(MediaKitPage_MediaKit_AggregatedDocument,options);}function useMediaKitPage_MediaKit_AggregatedLazyQuery(baseOptions){var options=Object.assign({},defaultOptions,baseOptions);return Apollo.useLazyQuery(MediaKitPage_MediaKit_AggregatedDocument,options);}