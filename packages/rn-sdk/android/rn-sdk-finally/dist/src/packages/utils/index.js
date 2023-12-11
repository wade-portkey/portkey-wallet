var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.formatChainInfoToShow=exports.formatAddress2NoPrefix=exports.enumToMap=exports.chainShowText=exports.addressFormat=void 0;exports.formatRpcUrl=formatRpcUrl;exports.getChainIdByAddress=exports.getAddressChainId=exports.formatStr2EllipsisStr=void 0;exports.getExploreLink=getExploreLink;exports.handleErrorMessage=exports.handleErrorCode=exports.handleError=void 0;exports.handlePhoneNumber=handlePhoneNumber;exports.isAddress=isAddress;exports.isDIDAddress=isDIDAddress;exports.isMainNet=exports.isExtension=void 0;exports.isPrivateKey=isPrivateKey;exports.isSameAddresses=void 0;exports.isUrl=isUrl;exports.sleep=exports.randomId=void 0;exports.strIncludes=strIncludes;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _web3Utils=require("web3-utils");var _aelf=require("./aelf");var uuid=_interopRequireWildcard(require("uuid"));function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap(),t=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(e){return e?t:r;})(e);}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u];}return n.default=e,t&&t.set(e,n),n;}var addressFormat=exports.addressFormat=function addressFormat(){var address=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'address';var chainId=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'AELF';var chainType=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'aelf';if(chainType!=='aelf')return address;var arr=address.split('_');if(address.includes('_')&&arr.length<3)return address;if(address.includes('_'))return"ELF_"+arr[1]+"_"+chainId;return"ELF_"+address+"_"+chainId;};function isAddress(address){var chainType=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'aelf';if(chainType==='aelf')return(0,_aelf.isAelfAddress)(address);return(0,_web3Utils.isAddress)(address);}function isDIDAddress(address){var chainType=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'aelf';if(chainType==='aelf')return(0,_aelf.isDIDAelfAddress)(address);return(0,_web3Utils.isAddress)(address);}var getChainIdByAddress=exports.getChainIdByAddress=function getChainIdByAddress(address){var chainType=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'aelf';if(chainType==='aelf'){if(address.includes('_')){var arr=address.split('_');return arr[arr.length-1];}else{return'AELF';}}throw Error('Not support');};var protocolAndDomainRE=/^(?:\w+:)?\/\/(\S+)$/;var localhostDomainRE=/^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;var nonLocalhostDomainRE=/^[^\s\.]+\.\S{2,}$/;function isUrl(string){if(typeof string!=='string'){return false;}var match=string.match(protocolAndDomainRE);if(!match){return false;}var everythingAfterProtocol=match[1];if(!everythingAfterProtocol){return false;}if(localhostDomainRE.test(everythingAfterProtocol)||nonLocalhostDomainRE.test(everythingAfterProtocol)){return true;}return false;}var enumToMap=exports.enumToMap=function enumToMap(v){var newMap={};Object.entries(v).forEach(function(_ref){var _ref2=(0,_slicedToArray2.default)(_ref,2),index=_ref2[0],value=_ref2[1];newMap[index]=value;newMap[value]=index;});return newMap;};function formatRpcUrl(rpc){rpc=rpc.trim();var length=rpc.length;if(rpc[length-1]==='/')return rpc.slice(0,length-1);return rpc;}function strIncludes(str1,str2){return str1.toLowerCase().includes(str2.toLowerCase().trim());}var sleep=exports.sleep=function sleep(time){return new Promise(function(resolve){var timeout=setTimeout(function(){clearTimeout(timeout);resolve();},time);});};function getExploreLink(explorerUrl,data){var type=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'address';var prefix=explorerUrl[explorerUrl.length-1]!=='/'?explorerUrl+'/':explorerUrl;switch(type){case'transaction':{return prefix+"tx/"+data;}case'token':{return prefix+"token/"+data;}case'block':{return prefix+"block/"+data;}case'address':default:{return prefix+"address/"+data;}}}function isPrivateKey(privateKey){try{if(privateKey&&typeof privateKey==='string')return Uint8Array.from(Buffer.from(privateKey,'hex')).length===32;}catch(error){return false;}return false;}var isExtension=exports.isExtension=function isExtension(){return process.env.DEVICE==='extension';};var randomId=exports.randomId=function randomId(){return uuid.v4().replace(/-/g,'');};var handleError=exports.handleError=function handleError(error){return(error==null?void 0:error.error)||error;};var handleErrorMessage=exports.handleErrorMessage=function handleErrorMessage(error,errorText){error=handleError(error);if(!error)return errorText;if(typeof error==='string')return error;if(typeof error.message==='string')return error.message;return errorText;};var chainShowText=exports.chainShowText=function chainShowText(chain){return chain==='AELF'?'MainChain':'SideChain';};var handleErrorCode=exports.handleErrorCode=function handleErrorCode(error){var _handleError;return(_handleError=handleError(error))==null?void 0:_handleError.code;};var formatChainInfoToShow=exports.formatChainInfoToShow=function formatChainInfoToShow(){var chainId=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'AELF';var networkType=arguments.length>1?arguments[1]:undefined;var chainType=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'aelf';if(chainType!=='aelf')return chainType;if(typeof networkType==='string')return(chainId==='AELF'?'MainChain':'SideChain')+" "+chainId+" "+(networkType==='MAIN'?'':'Testnet');return(chainId==='AELF'?'MainChain':'SideChain')+" "+chainId;};var formatStr2EllipsisStr=exports.formatStr2EllipsisStr=function formatStr2EllipsisStr(){var address=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';var digit=arguments.length>1&&arguments[1]!==undefined?arguments[1]:10;var type=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'middle';if(!address)return'';var len=address.length;if(type==='tail')return address.slice(0,digit)+"...";if(len<2*digit)return address;var pre=address.substring(0,digit);var suffix=address.substring(len-digit-1);return pre+"..."+suffix;};var formatAddress2NoPrefix=exports.formatAddress2NoPrefix=function formatAddress2NoPrefix(address){if(address.match(/^aelf:.+/)){return address.split(':')[1];}return address;};var isMainNet=exports.isMainNet=function isMainNet(network){return network==='MAIN';};var getAddressChainId=exports.getAddressChainId=function getAddressChainId(toAddress,defaultChainId){if(!toAddress.includes('_'))return defaultChainId;var arr=toAddress.split('_');var addressChainId=arr[arr.length-1];if((0,_aelf.isAelfAddress)(addressChainId)){return defaultChainId;}return addressChainId;};var isSameAddresses=exports.isSameAddresses=function isSameAddresses(address1,address2){return address1.trim()===address2.trim();};function handlePhoneNumber(str){if(str){str=str.replace(/\s/g,'');if(str[0]!=='+')str='+'+str;}return str||'';}