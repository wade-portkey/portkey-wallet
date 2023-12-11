var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _payment=require("./payment");var _render=require("test/utils/render");var _setup=require("test/utils/setup");var _paymentState=require("test/data/paymentState");var _guardianState=require("test/data/guardianState");var _util=require("../../api/api-did/payment/util");var _=require("./..");var networkHook=_interopRequireWildcard(require("./network"));var _react=require("@testing-library/react");var _payment2=require("../../constants/constants-ca/payment");var _utils=require("../../utils");var _socketSell=_interopRequireDefault(require("../../socket/socket-sell"));var _apiDid=require("../../api/api-did");function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}jest.mock("../../api/api-did/payment/util");jest.mock("../index");jest.mocked(_.useAppCommonDispatch).mockReturnValue(function(){var _ref=(0,_asyncToGenerator2.default)(function*(call){return call;});return function(_x){return _ref.apply(this,arguments);};}());jest.mock("../../utils");jest.mock("../../socket/socket-sell");jest.mock("../../api/api-did");beforeAll(function(){jest.useFakeTimers();});beforeEach(function(){jest.restoreAllMocks();});describe('usePayment',function(){test('get payment data successfully',function(){var _renderHookWithProvid=(0,_render.renderHookWithProvider)(_payment.usePayment,(0,_setup.setupStore)(_paymentState.PaymentState)),result=_renderHookWithProvid.result;expect(result.current).toHaveProperty('achTokenInfo');expect(result.current).toHaveProperty('buyFiatList');expect(result.current).toHaveProperty('sellFiatList');});test('failed to get payment data',function(){var _renderHookWithProvid2=(0,_render.renderHookWithProvider)(_payment.usePayment,(0,_setup.setupStore)({})),result=_renderHookWithProvid2.result;expect(result.current).toBeUndefined();});});describe('useGetAchTokenInfo',function(){afterEach(function(){jest.clearAllMocks();});test('complete data, and return successfully',(0,_asyncToGenerator2.default)(function*(){var _PaymentState$payment;expect.assertions(2);var achToken={id:'achTokenId',email:'aurora@porykey.finance',accessToken:'ACH...gA=='};jest.mocked(_util.getAchToken).mockResolvedValue(achToken);var state=Object.assign({},_paymentState.PaymentState,_guardianState.GuardianState);var _renderHookWithProvid3=(0,_render.renderHookWithProvider)(_payment.useGetAchTokenInfo,(0,_setup.setupStore)(state)),result=_renderHookWithProvid3.result;expect(result.current).toBeInstanceOf(Function);var res=yield result.current();expect(res).toHaveProperty('token',(_PaymentState$payment=_paymentState.PaymentState.payment.achTokenInfo)==null?void 0:_PaymentState$payment.token);}));test('no userGuardiansList data, and catch error',(0,_asyncToGenerator2.default)(function*(){expect.assertions(2);var state=Object.assign({},_paymentState.PaymentState,{guardians:{}});var _renderHookWithProvid4=(0,_render.renderHookWithProvider)(_payment.useGetAchTokenInfo,(0,_setup.setupStore)(state)),result=_renderHookWithProvid4.result;expect(result.current).toBeInstanceOf(Function);try{yield result.current();}catch(error){expect(error).toBeDefined();}}));test('no emailGuardian data, and return undefined',(0,_asyncToGenerator2.default)(function*(){expect.assertions(2);var state=Object.assign({},_paymentState.PaymentState,{guardians:{userGuardiansList:[]}});var _renderHookWithProvid5=(0,_render.renderHookWithProvider)(_payment.useGetAchTokenInfo,(0,_setup.setupStore)(state)),result=_renderHookWithProvid5.result;expect(result.current).toBeInstanceOf(Function);expect(yield result.current()).toBeUndefined();}));test('no achTokenInfo data, fetch AchToken, and return successfully',(0,_asyncToGenerator2.default)(function*(){expect.assertions(2);var state=Object.assign({payment:{achTokenInfo:undefined}},_guardianState.GuardianState);var achToken={id:'achTokenId',email:'aurora@porykey.finance',accessToken:'ACH043...QpgA=='};jest.mocked(_util.getAchToken).mockResolvedValue(achToken);var _renderHookWithProvid6=(0,_render.renderHookWithProvider)(_payment.useGetAchTokenInfo,(0,_setup.setupStore)(state)),result=_renderHookWithProvid6.result;expect(result.current).toBeInstanceOf(Function);var res=yield result.current();expect(res).toHaveProperty('token',achToken.accessToken);}));});describe('useSellTransfer',function(){test('testnet, and halfway return',(0,_asyncToGenerator2.default)(function*(){jest.spyOn(networkHook,'useIsMainnet').mockReturnValue(false);var _renderHook=(0,_react.renderHook)(function(){return(0,_payment.useSellTransfer)();}),result=_renderHook.result;var res=yield result.current({merchantName:_payment2.ACH_MERCHANT_NAME,orderId:'',paymentSellTransfer:jest.fn()});expect(res).toBeUndefined();}));test('merchantName !== ACH_MERCHANT_NAME, and halfway return',(0,_asyncToGenerator2.default)(function*(){jest.spyOn(networkHook,'useIsMainnet').mockReturnValue(true);var _renderHook2=(0,_react.renderHook)(function(){return(0,_payment.useSellTransfer)();}),result=_renderHook2.result;var res=yield result.current({merchantName:_payment2.ACH_MERCHANT_NAME+'test',orderId:'',paymentSellTransfer:jest.fn()});expect(res).toBeUndefined();}));test('mainnet and signalrSellResult === null, throw TIMEOUT error',(0,_asyncToGenerator2.default)(function*(){jest.spyOn(networkHook,'useIsMainnet').mockReturnValue(true);jest.mocked(_utils.randomId).mockReturnValue('test_id');jest.mocked(_socketSell.default.doOpen).mockImplementation(jest.fn());var mockSignalrSell=jest.fn(function(_params,callback){callback(null);return{remove:jest.fn()};});jest.mocked(_socketSell.default.onAchTxAddressReceived).mockImplementation(mockSignalrSell);jest.mocked(_socketSell.default.requestAchTxAddress).mockImplementation(jest.fn());var _renderHook3=(0,_react.renderHook)(function(){return(0,_payment.useSellTransfer)();}),result=_renderHook3.result;var mockPaymentSellTransfer=jest.fn().mockResolvedValue({transactionId:'transactionId'});try{yield result.current({merchantName:_payment2.ACH_MERCHANT_NAME,orderId:'',paymentSellTransfer:mockPaymentSellTransfer});}catch(error){expect(error).toEqual({code:'TIMEOUT',message:'Transaction failed.'});}}));test('mainnet, signalrSellResult and !transactionId, throw NO_TX_HASH error ',(0,_asyncToGenerator2.default)(function*(){jest.spyOn(networkHook,'useIsMainnet').mockReturnValue(true);jest.mocked(_utils.randomId).mockReturnValue('test_id');jest.mocked(_socketSell.default.doOpen).mockImplementation(jest.fn());var mockSignalrSell=jest.fn(function(params,callback){var data={params:params};callback(data);return{remove:jest.fn()};});jest.mocked(_socketSell.default.onAchTxAddressReceived).mockImplementation(mockSignalrSell);jest.mocked(_socketSell.default.requestAchTxAddress).mockImplementation(jest.fn());jest.mocked(_socketSell.default.stop).mockImplementation(jest.fn());jest.spyOn(global,'setTimeout');jest.runAllTimers();jest.mocked(_apiDid.request.payment.updateAlchemyOrderTxHash).mockResolvedValue({});var _renderHook4=(0,_react.renderHook)(function(){return(0,_payment.useSellTransfer)();}),result=_renderHook4.result;var mockPaymentSellTransfer=jest.fn().mockResolvedValue({transactionId:''});try{yield result.current({merchantName:_payment2.ACH_MERCHANT_NAME,orderId:'',paymentSellTransfer:mockPaymentSellTransfer});}catch(error){expect(error).toEqual({code:'NO_TX_HASH',message:'Transaction failed. Please contact the team for assistance.'});}}));test('mainnet, signalrSellResult and transactionId, update order tx hash',(0,_asyncToGenerator2.default)(function*(){jest.spyOn(networkHook,'useIsMainnet').mockReturnValue(true);jest.mocked(_utils.randomId).mockReturnValue('test_id');jest.mocked(_socketSell.default.doOpen).mockImplementation(jest.fn());var mockSignalrSell=jest.fn(function(params,callback){var data={params:params};callback(data);return{remove:jest.fn()};});jest.mocked(_socketSell.default.onAchTxAddressReceived).mockImplementation(mockSignalrSell);jest.mocked(_socketSell.default.requestAchTxAddress).mockImplementation(jest.fn());jest.mocked(_socketSell.default.stop).mockImplementation(jest.fn());jest.spyOn(global,'setTimeout');jest.runAllTimers();jest.mocked(_apiDid.request.payment.updateAlchemyOrderTxHash).mockResolvedValue({});var _renderHook5=(0,_react.renderHook)(function(){return(0,_payment.useSellTransfer)();}),result=_renderHook5.result;var mockPaymentSellTransfer=jest.fn().mockResolvedValue({transactionId:'transactionId'});yield result.current({merchantName:_payment2.ACH_MERCHANT_NAME,orderId:'',paymentSellTransfer:mockPaymentSellTransfer});expect(_apiDid.request.payment.updateAlchemyOrderTxHash).toBeCalled();}));});