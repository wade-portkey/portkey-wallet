Object.defineProperty(exports,"__esModule",{value:true});exports.formatChannelList=void 0;var formatChannelList=exports.formatChannelList=function formatChannelList(channelList){var pinList=[];var normalList=[];var channelUuidMap=new Map();channelList.list=channelList.list.filter(function(channelItem){if(channelUuidMap.has(channelItem.channelUuid))return false;channelUuidMap.set(channelItem.channelUuid,true);return true;});channelList.list.forEach(function(channelItem){if(channelItem.pin)pinList.push(channelItem);else normalList.push(channelItem);});var now=Date.now();pinList.sort(function(a,b){return Number(b.lastPostAt||now)-Number(a.lastPostAt||now);});normalList.sort(function(a,b){return Number(b.lastPostAt||now)-Number(a.lastPostAt||now);});return Object.assign({},channelList,{list:[].concat(pinList,normalList)});};