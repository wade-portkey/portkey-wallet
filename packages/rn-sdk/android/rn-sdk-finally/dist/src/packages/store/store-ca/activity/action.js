var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.getActivityListAsync=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _toolkit=require("@reduxjs/toolkit");var _api=require("./api");var getActivityListAsync=exports.getActivityListAsync=(0,_toolkit.createAsyncThunk)('activity/getActivityList',function(){var _ref=(0,_asyncToGenerator2.default)(function*(params){var response=yield(0,_api.fetchActivities)(params).catch(function(error){var _error$error;if(error!=null&&error.type)throw Error(error.type);if(error!=null&&(_error$error=error.error)!=null&&_error$error.message)throw Error(error.error.message);throw Error(JSON.stringify(error));});if(!(response!=null&&response.data)||!(response!=null&&response.totalRecordCount))throw Error('No data');return{data:response.data,totalRecordCount:response.totalRecordCount,maxResultCount:params.maxResultCount,skipCount:params.skipCount,chainId:params.chainId,symbol:params.symbol};});return function(_x){return _ref.apply(this,arguments);};}());