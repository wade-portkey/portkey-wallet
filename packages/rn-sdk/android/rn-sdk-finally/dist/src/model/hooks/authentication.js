var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.useAppleAuthentication=useAppleAuthentication;exports.useGoogleAuthentication=useGoogleAuthentication;exports.useVerifyAppleToken=useVerifyAppleToken;exports.useVerifyGoogleToken=useVerifyGoogleToken;exports.useVerifyToken=useVerifyToken;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var WebBrowser=_interopRequireWildcard(require("expo-web-browser"));var _react=require("react");var _googleSignin=require("@react-native-google-signin/google-signin");var _device=require("../../packages/utils/mobile/device");var Google=_interopRequireWildcard(require("expo-auth-session/providers/google"));var _reactNativeConfig=_interopRequireDefault(require("react-native-config"));var Application=_interopRequireWildcard(require("expo-application"));var _expoAuthSession=require("expo-auth-session");var _apiDid=require("../../packages/api/api-did");var _authentication=require("../../packages/utils/authentication");var _wallet=require("../../packages/types/types-ca/wallet");var _utils=require("../../packages/utils");var _reactNative=require("react-native");var _reactNativeAppleAuthentication=_interopRequireWildcard(require("@invertase/react-native-apple-authentication"));var _NetworkContext=_interopRequireDefault(require("../../pages/Login/context/NetworkContext"));var _appleLogin=require("./apple-login");var _controller=require("../../network/controller");function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}if(!_device.isIOS){_googleSignin.GoogleSignin.configure({offlineAccess:true,webClientId:_reactNativeConfig.default.GOOGLE_WEB_CLIENT_ID});}else{WebBrowser.maybeCompleteAuthSession();}function useGoogleAuthentication(){var _useState=(0,_react.useState)(),_useState2=(0,_slicedToArray2.default)(_useState,2),androidResponse=_useState2[0],setResponse=_useState2[1];var _Google$useAuthReques=Google.useAuthRequest({iosClientId:_reactNativeConfig.default.GOOGLE_IOS_CLIENT_ID,androidClientId:_reactNativeConfig.default.GOOGLE_ANDROID_CLIENT_ID,shouldAutoExchangeCode:false}),_Google$useAuthReques2=(0,_slicedToArray2.default)(_Google$useAuthReques,3),googleRequest=_Google$useAuthReques2[0],response=_Google$useAuthReques2[1],promptAsync=_Google$useAuthReques2[2];var iosPromptAsync=(0,_react.useCallback)((0,_asyncToGenerator2.default)(function*(){yield(0,_utils.sleep)(2000);if(_reactNative.AppState.currentState!=='active')throw{message:''};var info=yield promptAsync();if(info.type==='success'){var exchangeRequest=new _expoAuthSession.AccessTokenRequest({clientId:_reactNativeConfig.default.GOOGLE_IOS_CLIENT_ID,redirectUri:(0,_expoAuthSession.makeRedirectUri)({native:Application.applicationId+":/oauthredirect"}),code:info.params.code,extraParams:{code_verifier:(googleRequest==null?void 0:googleRequest.codeVerifier)||''}});var authentication=yield exchangeRequest.performAsync(Google.discovery);var userInfo=yield(0,_authentication.getGoogleUserInfo)(authentication==null?void 0:authentication.accessToken);return Object.assign({user:Object.assign({},userInfo,{photo:userInfo.picture,familyName:userInfo.family_name,givenName:userInfo.given_name})},authentication);}var message=info.type==='cancel'?'':'It seems that the authorization with your Google account has failed.';throw Object.assign({},info,{message:message});}),[promptAsync,googleRequest==null?void 0:googleRequest.codeVerifier]);var androidPromptAsync=(0,_react.useCallback)((0,_asyncToGenerator2.default)(function*(){yield(0,_utils.sleep)(500);try{yield _googleSignin.GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog:true});}catch(err){throw Error('Portkey‘s services are not available in your device.');}try{var userInfo=yield _googleSignin.GoogleSignin.signIn();var token=yield _googleSignin.GoogleSignin.getTokens();yield _googleSignin.GoogleSignin.signOut();var googleResponse=Object.assign({},userInfo,token);setResponse(googleResponse);return googleResponse;}catch(error){var message=error.code===_googleSignin.statusCodes.SIGN_IN_CANCELLED?'':(0,_utils.handleErrorMessage)(error);throw Object.assign({},error,{message:message});}}),[]);var googleSign=(0,_react.useCallback)((0,_asyncToGenerator2.default)(function*(){try{return yield(_device.isIOS?iosPromptAsync:androidPromptAsync)();}finally{}}),[androidPromptAsync,iosPromptAsync]);return(0,_react.useMemo)(function(){return{googleResponse:_device.isIOS?response:androidResponse,googleSign:googleSign};},[androidResponse,googleSign,response]);}function useAppleAuthentication(){var _useState3=(0,_react.useState)(),_useState4=(0,_slicedToArray2.default)(_useState3,2),response=_useState4[0],setResponse=_useState4[1];var _useState5=(0,_react.useState)(),_useState6=(0,_slicedToArray2.default)(_useState5,2),androidResponse=_useState6[0],setAndroidResponse=_useState6[1];var _useContext=(0,_react.useContext)(_NetworkContext.default),currentNetwork=_useContext.currentNetwork;(0,_react.useEffect)(function(){if(_device.isIOS)return;_reactNativeAppleAuthentication.appleAuthAndroid.configure({clientId:_reactNativeConfig.default.APPLE_CLIENT_ID,redirectUri:(currentNetwork==null?void 0:currentNetwork.networkType)==='MAIN'?_reactNativeConfig.default.APPLE_MAIN_REDIRECT_URI:_reactNativeConfig.default.APPLE_TESTNET_REDIRECT_URI,scope:_reactNativeAppleAuthentication.appleAuthAndroid.Scope.ALL,responseType:_reactNativeAppleAuthentication.appleAuthAndroid.ResponseType.ALL});},[currentNetwork]);var iosPromptAsync=(0,_react.useCallback)((0,_asyncToGenerator2.default)(function*(){setResponse(undefined);try{var appleLoginToken=yield(0,_appleLogin.appleLogin)();var appleInfo={identityToken:appleLoginToken};var user=(0,_authentication.parseAppleIdentityToken)(appleInfo.identityToken);var userInfo=Object.assign({},appleInfo,{user:Object.assign({},user,{id:user==null?void 0:user.userId})});setResponse(userInfo);return userInfo;}catch(error){console.log(error,'======error');var message=(error==null?void 0:error.code)===_reactNativeAppleAuthentication.default.Error.CANCELED?'':(0,_utils.handleErrorMessage)(error);throw Object.assign({},error,{message:message});}}),[]);var androidPromptAsync=(0,_react.useCallback)((0,_asyncToGenerator2.default)(function*(){setAndroidResponse(undefined);try{var _appleInfo$user,_appleInfo$user$name,_appleInfo$user2,_appleInfo$user2$name,_appleInfo$user3,_appleInfo$user3$name;var appleInfo=yield _reactNativeAppleAuthentication.appleAuthAndroid.signIn();var user=(0,_authentication.parseAppleIdentityToken)(appleInfo.id_token);console.log(appleInfo,'======appleInfo');if((_appleInfo$user=appleInfo.user)!=null&&(_appleInfo$user$name=_appleInfo$user.name)!=null&&_appleInfo$user$name.lastName){try{yield _apiDid.request.verify.sendAppleUserExtraInfo({params:{identityToken:appleInfo.id_token,userInfo:{name:{firstName:appleInfo.user.name.firstName,lastName:appleInfo.user.name.lastName},email:(user==null?void 0:user.email)||appleInfo.user.email}}});}catch(error){console.log(error,'======error');}}var userInfo={identityToken:appleInfo.id_token,fullName:{givenName:(_appleInfo$user2=appleInfo.user)==null?void 0:(_appleInfo$user2$name=_appleInfo$user2.name)==null?void 0:_appleInfo$user2$name.firstName,familyName:(_appleInfo$user3=appleInfo.user)==null?void 0:(_appleInfo$user3$name=_appleInfo$user3.name)==null?void 0:_appleInfo$user3$name.lastName},user:Object.assign({},user,{id:user==null?void 0:user.userId})};setAndroidResponse(userInfo);return userInfo;}catch(error){var message=(error==null?void 0:error.message)===_reactNativeAppleAuthentication.appleAuthAndroid.Error.SIGNIN_CANCELLED?'':(0,_utils.handleErrorMessage)(error);throw Object.assign({},error,{message:message});}}),[]);var appleSign=(0,_react.useCallback)((0,_asyncToGenerator2.default)(function*(){try{return yield(_device.isIOS?iosPromptAsync:androidPromptAsync)();}finally{}}),[androidPromptAsync,iosPromptAsync]);return(0,_react.useMemo)(function(){return{appleResponse:_device.isIOS?response:androidResponse,appleSign:appleSign};},[androidResponse,appleSign,response]);}function useVerifyGoogleToken(){var _useGoogleAuthenticat=useGoogleAuthentication(),googleSign=_useGoogleAuthenticat.googleSign;return(0,_react.useCallback)(function(){var _ref7=(0,_asyncToGenerator2.default)(function*(params){var accessToken=params.accessToken;var isRequest=!accessToken;if(accessToken){try{var _yield$getGoogleUserI=yield(0,_authentication.getGoogleUserInfo)(accessToken),id=_yield$getGoogleUserI.id;if(!id||id!==params.id)isRequest=true;}catch(error){isRequest=true;}}if(isRequest){var userInfo=yield googleSign();accessToken=userInfo==null?void 0:userInfo.accessToken;if(userInfo.user.id!==params.id)throw new Error('Account does not match your guardian');}var rst=yield _controller.NetworkController.verifyGoogleGuardianInfo(Object.assign({},params,{accessToken:accessToken||'',verifierId:params.verifierId||''}));return Object.assign({},rst,{accessToken:accessToken});});return function(_x){return _ref7.apply(this,arguments);};}(),[googleSign]);}function useVerifyAppleToken(){var _useAppleAuthenticati=useAppleAuthentication(),appleSign=_useAppleAuthenticati.appleSign;return(0,_react.useCallback)(function(){var _ref8=(0,_asyncToGenerator2.default)(function*(params){var accessToken=params.accessToken;var _ref9=(0,_authentication.parseAppleIdentityToken)(accessToken)||{},tokenIsExpired=_ref9.isExpired;if(!accessToken||tokenIsExpired){var info=yield appleSign();accessToken=info.identityToken||undefined;}var _ref10=(0,_authentication.parseAppleIdentityToken)(accessToken)||{},userId=_ref10.userId;if(userId!==params.id)throw new Error('Account does not match your guardian');var rst=yield _controller.NetworkController.verifyAppleGuardianInfo(Object.assign({},params,{accessToken:accessToken||'',verifierId:params.verifierId||''}));return Object.assign({},rst,{accessToken:accessToken});});return function(_x2){return _ref8.apply(this,arguments);};}(),[appleSign]);}function useVerifyToken(){var verifyGoogleToken=useVerifyGoogleToken();var verifyAppleToken=useVerifyAppleToken();return(0,_react.useCallback)(function(type,params){return(type===_wallet.LoginType.Apple?verifyAppleToken:verifyGoogleToken)(params);},[verifyAppleToken,verifyGoogleToken]);}