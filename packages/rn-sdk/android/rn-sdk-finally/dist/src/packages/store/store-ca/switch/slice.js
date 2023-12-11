var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.switchSlice=exports.fetchIsShowBuyFeatureAsync=exports.default=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _toolkit=require("@reduxjs/toolkit");var _apiDid=require("../../../api/api-did");var initialState={isShowBuyFeature:false};var fetchIsShowBuyFeatureAsync=exports.fetchIsShowBuyFeatureAsync=(0,_toolkit.createAsyncThunk)('fetchIsShowBuyFeatureAsync',(0,_asyncToGenerator2.default)(function*(){var result=yield _apiDid.request.switch.checkButtonBuy({params:{switchName:'ramp'}});return result.isOpen;}));var switchSlice=exports.switchSlice=(0,_toolkit.createSlice)({name:'switch',initialState:initialState,reducers:{},extraReducers:function extraReducers(builder){builder.addCase(fetchIsShowBuyFeatureAsync.fulfilled,function(state,action){state.isShowBuyFeature=action.payload;});}});var _default=exports.default=switchSlice;