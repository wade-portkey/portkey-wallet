var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _slice=require("./slice");var _toolkit=require("@reduxjs/toolkit");var _apiDid=require("../../../api/api-did");jest.mock("../../../api/api-did");var reducer=_slice.switchSlice.reducer;describe('fetchIsShowBuyFeatureAsync',function(){var store=(0,_toolkit.configureStore)({reducer:reducer});test('fetch show Buy Feature',(0,_asyncToGenerator2.default)(function*(){jest.mocked(_apiDid.request.switch.checkButtonBuy).mockResolvedValueOnce({isOpen:true});yield store.dispatch((0,_slice.fetchIsShowBuyFeatureAsync)());expect(store.getState().isShowBuyFeature).toBe(true);}));test('fetch hide Buy Feature',(0,_asyncToGenerator2.default)(function*(){jest.mocked(_apiDid.request.switch.checkButtonBuy).mockResolvedValueOnce({isOpen:false});yield store.dispatch((0,_slice.fetchIsShowBuyFeatureAsync)());expect(store.getState().isShowBuyFeature).toBe(false);}));});