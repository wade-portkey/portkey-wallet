var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.getGoogleUserInfo=getGoogleUserInfo;exports.parseAppleIdentityToken=parseAppleIdentityToken;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _fetch=require("./fetch");var _buffer=require("buffer");if(!global.Buffer){global.Buffer=_buffer.Buffer;}function parseAppleIdentityToken(identityToken){if(!identityToken)return;var parts=identityToken.split('.');var payload=JSON.parse(_buffer.Buffer.from(parts[1],'base64').toString());var expirationTime=new Date(payload.exp*1000);var isExpired=expirationTime<new Date();var userId=payload.sub;var email=payload.email;var isPrivate=typeof payload.is_private_email==='string'?payload.is_private_email==='true':payload.is_private_email||!payload.email;return{isExpired:isExpired,userId:userId,email:email,expirationTime:expirationTime,isPrivate:isPrivate};}var TmpUserInfo={};function getGoogleUserInfo(){return _getGoogleUserInfo.apply(this,arguments);}function _getGoogleUserInfo(){_getGoogleUserInfo=(0,_asyncToGenerator2.default)(function*(){var accessToken=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';if(!TmpUserInfo[accessToken])TmpUserInfo[accessToken]=yield(0,_fetch.customFetch)('https://www.googleapis.com/userinfo/v2/me',{headers:{Authorization:"Bearer "+accessToken}});return Object.assign({},TmpUserInfo[accessToken],{firstName:TmpUserInfo[accessToken].given_name,lastName:TmpUserInfo[accessToken].family_name});});return _getGoogleUserInfo.apply(this,arguments);}