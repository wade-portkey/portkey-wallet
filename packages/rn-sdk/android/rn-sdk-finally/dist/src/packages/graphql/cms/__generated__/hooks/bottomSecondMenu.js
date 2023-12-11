var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.BottomSecondMenuDocument=void 0;exports.useBottomSecondMenuLazyQuery=useBottomSecondMenuLazyQuery;exports.useBottomSecondMenuQuery=useBottomSecondMenuQuery;var _taggedTemplateLiteralLoose2=_interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));var _client=_interopRequireWildcard(require("@apollo/client"));var Apollo=_client;var _templateObject;function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}var defaultOptions={};var BottomSecondMenuDocument=exports.BottomSecondMenuDocument=(0,_client.gql)(_templateObject||(_templateObject=(0,_taggedTemplateLiteralLoose2.default)(["\n  query bottomSecondMenu(\n    $filter: navigationType_filter\n    $sort: [String]\n    $limit: Int\n    $offset: Int\n    $page: Int\n    $search: String\n    $filter1: bottomMenu_filter\n    $sort1: [String]\n    $limit1: Int\n    $offset1: Int\n    $page1: Int\n    $search1: String\n    $filter2: navigationType_filter\n    $sort2: [String]\n    $limit2: Int\n    $offset2: Int\n    $page2: Int\n    $search2: String\n    $filter3: bottomSecondMenu_filter\n    $sort3: [String]\n    $limit3: Int\n    $offset3: Int\n    $page3: Int\n    $search3: String\n    $filter4: bottomMenu_filter\n    $sort4: [String]\n    $limit4: Int\n    $offset4: Int\n    $page4: Int\n    $search4: String\n    $filter5: navigationType_filter\n    $sort5: [String]\n    $limit5: Int\n    $offset5: Int\n    $page5: Int\n    $search5: String\n    $filter6: bottomSecondMenu_filter\n    $sort6: [String]\n    $limit6: Int\n    $offset6: Int\n    $page6: Int\n    $search6: String\n  ) {\n    bottomSecondMenu(filter: $filter6, sort: $sort6, limit: $limit6, offset: $offset6, page: $page6, search: $search6) {\n      date_created\n      date_created_func {\n        year\n        month\n        week\n        day\n        weekday\n        hour\n        minute\n        second\n      }\n      date_updated\n      date_updated_func {\n        year\n        month\n        week\n        day\n        weekday\n        hour\n        minute\n        second\n      }\n      id\n      index\n      parent(filter: $filter4, sort: $sort4, limit: $limit4, offset: $offset4, page: $page4, search: $search4) {\n        date_created\n        date_created_func {\n          year\n          month\n          week\n          day\n          weekday\n          hour\n          minute\n          second\n        }\n        date_updated\n        date_updated_func {\n          year\n          month\n          week\n          day\n          weekday\n          hour\n          minute\n          second\n        }\n        id\n        index\n        path\n        sort\n        status\n        title\n        type(filter: $filter, sort: $sort, limit: $limit, offset: $offset, page: $page, search: $search) {\n          date_created\n          date_created_func {\n            year\n            month\n            week\n            day\n            weekday\n            hour\n            minute\n            second\n          }\n          date_updated\n          date_updated_func {\n            year\n            month\n            week\n            day\n            weekday\n            hour\n            minute\n            second\n          }\n          description\n          id\n          sort\n          status\n          user_created\n          user_updated\n          value\n        }\n        user_created\n        user_updated\n        children(filter: $filter3, sort: $sort3, limit: $limit3, offset: $offset3, page: $page3, search: $search3) {\n          date_created\n          date_created_func {\n            year\n            month\n            week\n            day\n            weekday\n            hour\n            minute\n            second\n          }\n          date_updated\n          date_updated_func {\n            year\n            month\n            week\n            day\n            weekday\n            hour\n            minute\n            second\n          }\n          id\n          index\n          parent(filter: $filter1, sort: $sort1, limit: $limit1, offset: $offset1, page: $page1, search: $search1) {\n            date_created\n            date_updated\n            id\n            index\n            path\n            sort\n            status\n            title\n            user_created\n            user_updated\n            children_func {\n              count\n            }\n          }\n          path\n          sort\n          status\n          title\n          type(filter: $filter2, sort: $sort2, limit: $limit2, offset: $offset2, page: $page2, search: $search2) {\n            date_created\n            date_updated\n            description\n            id\n            sort\n            status\n            user_created\n            user_updated\n            value\n          }\n          user_created\n          user_updated\n        }\n      }\n      path\n      sort\n      status\n      title\n      type(filter: $filter5, sort: $sort5, limit: $limit5, offset: $offset5, page: $page5, search: $search5) {\n        date_created\n        date_updated\n        description\n        id\n        sort\n        status\n        user_created\n        user_updated\n        value\n      }\n      user_created\n      user_updated\n    }\n  }\n"])));function useBottomSecondMenuQuery(baseOptions){var options=Object.assign({},defaultOptions,baseOptions);return Apollo.useQuery(BottomSecondMenuDocument,options);}function useBottomSecondMenuLazyQuery(baseOptions){var options=Object.assign({},defaultOptions,baseOptions);return Apollo.useLazyQuery(BottomSecondMenuDocument,options);}