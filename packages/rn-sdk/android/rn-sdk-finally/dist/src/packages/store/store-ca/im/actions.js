Object.defineProperty(exports,"__esModule",{value:true});exports.updateChannelMessageAttribute=exports.updateChannelAttribute=exports.setRelationToken=exports.setRelationId=exports.setHasNext=exports.setChannelMessageList=exports.setChannelList=exports.resetIm=exports.removeChannel=exports.nextChannelMessageList=exports.nextChannelList=exports.deleteChannelMessage=exports.addChannelMessage=exports.addChannel=void 0;var _toolkit=require("@reduxjs/toolkit");var setChannelList=exports.setChannelList=(0,_toolkit.createAction)('im/setChannelList');var nextChannelList=exports.nextChannelList=(0,_toolkit.createAction)('im/nextChannelList');var setHasNext=exports.setHasNext=(0,_toolkit.createAction)('im/setHasNext');var updateChannelAttribute=exports.updateChannelAttribute=(0,_toolkit.createAction)('im/updateChannelAttribute');var addChannel=exports.addChannel=(0,_toolkit.createAction)('im/addChannel');var removeChannel=exports.removeChannel=(0,_toolkit.createAction)('im/removeChannel');var addChannelMessage=exports.addChannelMessage=(0,_toolkit.createAction)('im/addChannelMessage');var nextChannelMessageList=exports.nextChannelMessageList=(0,_toolkit.createAction)('im/nextChannelMessageList');var setChannelMessageList=exports.setChannelMessageList=(0,_toolkit.createAction)('im/setChannelMessageList');var deleteChannelMessage=exports.deleteChannelMessage=(0,_toolkit.createAction)('im/deleteChannelMessage');var updateChannelMessageAttribute=exports.updateChannelMessageAttribute=(0,_toolkit.createAction)('im/updateChannelMessageAttribute');var setRelationId=exports.setRelationId=(0,_toolkit.createAction)('im/setRelationId');var resetIm=exports.resetIm=(0,_toolkit.createAction)('im/resetIm');var setRelationToken=exports.setRelationToken=(0,_toolkit.createAction)('im/setRelationToken');