var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.SocialMedia_AggregatedDocument=void 0;exports.useSocialMedia_AggregatedLazyQuery=useSocialMedia_AggregatedLazyQuery;exports.useSocialMedia_AggregatedQuery=useSocialMedia_AggregatedQuery;var _taggedTemplateLiteralLoose2=_interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));var _client=_interopRequireWildcard(require("@apollo/client"));var Apollo=_client;var _templateObject;function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}var defaultOptions={};var SocialMedia_AggregatedDocument=exports.SocialMedia_AggregatedDocument=(0,_client.gql)(_templateObject||(_templateObject=(0,_taggedTemplateLiteralLoose2.default)(["\n  query socialMedia_aggregated(\n    $groupBy: [String]\n    $filter: socialMedia_filter\n    $limit: Int\n    $offset: Int\n    $page: Int\n    $search: String\n    $sort: [String]\n  ) {\n    socialMedia_aggregated(\n      groupBy: $groupBy\n      filter: $filter\n      limit: $limit\n      offset: $offset\n      page: $page\n      search: $search\n      sort: $sort\n    ) {\n      group\n      countAll\n      count {\n        date_created\n        date_updated\n        id\n        index\n        link\n        sort\n        status\n        svgUrl\n        title\n        user_created\n        user_updated\n      }\n      countDistinct {\n        date_created\n        date_updated\n        id\n        index\n        link\n        sort\n        status\n        svgUrl\n        title\n        user_created\n        user_updated\n      }\n      avg {\n        id\n        index\n        sort\n      }\n      sum {\n        id\n        index\n        sort\n      }\n      avgDistinct {\n        id\n        index\n        sort\n      }\n      sumDistinct {\n        id\n        index\n        sort\n      }\n      min {\n        id\n        index\n        sort\n      }\n      max {\n        id\n        index\n        sort\n      }\n    }\n  }\n"])));function useSocialMedia_AggregatedQuery(baseOptions){var options=Object.assign({},defaultOptions,baseOptions);return Apollo.useQuery(SocialMedia_AggregatedDocument,options);}function useSocialMedia_AggregatedLazyQuery(baseOptions){var options=Object.assign({},defaultOptions,baseOptions);return Apollo.useLazyQuery(SocialMedia_AggregatedDocument,options);}