var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _guardian=require("./guardian");var _apiDid=require("../../api/api-did");var _react=require("@testing-library/react");var _render=require("test/utils/render");var _setup=require("test/utils/setup");jest.mock("../../api/api-did");describe('useGetRegisterInfo',function(){test('complete data, and return successfully',(0,_asyncToGenerator2.default)(function*(){expect.assertions(1);jest.mocked(_apiDid.request.wallet.getRegisterInfo).mockResolvedValue([]);var _renderHook=(0,_react.renderHook)(function(){return(0,_guardian.useGetRegisterInfo)();}),result=_renderHook.result;var res=yield result.current({loginGuardianIdentifier:'aa_bb_cc'});expect(res).toHaveLength(0);}));test('mock reject, and catch error',(0,_asyncToGenerator2.default)(function*(){expect.assertions(2);jest.mocked(_apiDid.request.wallet.getRegisterInfo).mockRejectedValue({code:500,message:'server error'});var _renderHook2=(0,_react.renderHook)(function(){return(0,_guardian.useGetRegisterInfo)();}),result=_renderHook2.result;try{yield result.current({loginGuardianIdentifier:''});}catch(e){expect(e).toHaveProperty('code',500);expect(e).toHaveProperty('message','server error');}}));});describe('useGuardiansInfo',function(){test('guardians in store, and return successfully',function(){var verifierMapItem={'2ded6...68dbda8':{id:'2ded6...68dbda8',name:'CryptoGuardian',imageUrl:'https://localhost/img/CryptoGuardian.png',endPoints:['http://localhost'],verifierAddresses:['2bWw...dSb4hJz']}};var state={guardians:{verifierMap:[verifierMapItem]}};var _renderHookWithProvid=(0,_render.renderHookWithProvider)(_guardian.useGuardiansInfo,(0,_setup.setupStore)(state)),result=_renderHookWithProvid.result;expect(result.current.verifierMap).toHaveLength(1);});test('no guardians in store, and return undefined',function(){var _renderHookWithProvid2=(0,_render.renderHookWithProvider)(_guardian.useGuardiansInfo,(0,_setup.setupStore)({})),result=_renderHookWithProvid2.result;expect(result.current).toBeUndefined();});});