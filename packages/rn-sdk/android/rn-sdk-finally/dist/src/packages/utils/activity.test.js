var _activity=require("../constants/constants-ca/activity");var _activity2=require("./activity");describe('transNetworkText',function(){test('MainChain and Testnet',function(){var res=(0,_activity2.transNetworkText)('AELF',true);expect(res).toBe(_activity.MAIN_CHAIN+' AELF '+_activity.TEST_NET);});test('MainChain and Mainnet',function(){var res=(0,_activity2.transNetworkText)('AELF',false);expect(res).toBe(_activity.MAIN_CHAIN+' AELF');});test('SideChain and Testnet',function(){var res=(0,_activity2.transNetworkText)('tDVV',true);expect(res).toBe(_activity.SIDE_CHAIN+' tDVV '+_activity.TEST_NET);});test('SideChain and Mainnet',function(){var res=(0,_activity2.transNetworkText)('tDVV',false);expect(res).toBe(_activity.SIDE_CHAIN+' tDVV');});});describe('getCurrentActivityMapKey',function(){test('MainChain and ELF',function(){var res=(0,_activity2.getCurrentActivityMapKey)('AELF','ELF');expect(res).toBe('AELF_ELF');});test('MainChain and empty symbol',function(){var res=(0,_activity2.getCurrentActivityMapKey)('AELF','');expect(res).toBe('AELF_');});test('SideChain and ELF',function(){var res=(0,_activity2.getCurrentActivityMapKey)('tDVV','ELF');expect(res).toBe('tDVV_ELF');});test('SideChain and empty symbol',function(){var res=(0,_activity2.getCurrentActivityMapKey)('tDVV','');expect(res).toBe('tDVV_');});test('empty chainId and empty symbol',function(){var res=(0,_activity2.getCurrentActivityMapKey)('','');expect(res).toBe('TOTAL');});});