Object.defineProperty(exports,"__esModule",{value:true});exports.networkClientMap=exports.getApolloClient=void 0;var _network=require("../../constants/constants-ca/network");var _client=require("../client");var networkClientMap=exports.networkClientMap={};var getApolloClient=exports.getApolloClient=function getApolloClient(networkType){if(!networkClientMap[networkType]){var _NetworkList$find;var graphqlUrl=((_NetworkList$find=_network.NetworkList.find(function(item){return item.networkType===networkType;}))==null?void 0:_NetworkList$find.graphqlUrl)||'';networkClientMap[networkType]=(0,_client.graphQLClientProvider)(graphqlUrl);}return networkClientMap[networkType];};