var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _index=require("./index");var _types=require("./types");var _aes=_interopRequireDefault(require("../aes"));var _aelfSdk=_interopRequireDefault(require("aelf-sdk"));var _=require("./..");var _wallet=require("../../constants/wallet");var _reg=require("../reg");jest.mock("./..");jest.mock("../reg");describe('handleWalletInfo',function(){test('Params contain publicKey',function(){expect((0,_index.handleWalletInfo)({publicKey:'publicKey'})).toEqual(expect.objectContaining({publicKey:'publicKey'}));});test('Params doesn`t contain publicKey, contain keyPair',function(){expect(function(){return(0,_index.handleWalletInfo)({keyPair:'keyPair'});}).toThrow();var res=(0,_index.handleWalletInfo)({keyPair:{getPublic:jest.fn().mockImplementation(function(){return{x:'xxx',y:'yyy'};})}});expect(Object.keys(res)).toContain('publicKey');});test('ReturnValue does not contain keyPair and childWallet',function(){var res=(0,_index.handleWalletInfo)({publicKey:'publicKey',keyPair:'keyPair',childWallet:'childWallet'});expect(Object.keys(res)).not.toContain('keyPair');expect(Object.keys(res)).not.toContain('childWallet');});});describe('formatWalletInfo',function(){var password='11111111',accountName='testName';var walletInfoInput={privateKey:'privateKey',mnemonic:'mnemonic',publicKey:'publicKey',xPrivateKey:'xPrivateKey',keyPair:'keyPair',childWallet:'childWallet'};test('WalletInfoInput does not exist',function(){expect((0,_index.formatWalletInfo)(null,password,accountName)).toBeFalsy;});test('PrivateKey of walletInfoInput exist but password does not exist',function(){expect((0,_index.formatWalletInfo)({privateKey:'privateKey'},'',accountName)).toBeFalsy;});test('KeyPair does not exist',function(){expect((0,_index.formatWalletInfo)({},password,accountName)).toThrowError;});test('The walletInfoInput does not contain publicKey, contain keyPair',function(){var res=(0,_index.formatWalletInfo)({keyPair:{getPublic:jest.fn().mockImplementation(function(){return{x:'xxx',y:'yyy'};})}},password,accountName);expect(res.accountInfo.publicKey).toBeDefined();});test('Valid input, check generate AESEncryptPrivateKey and AESEncryptMnemonic',function(){_aes.default.encrypt=jest.fn();(0,_index.formatWalletInfo)(walletInfoInput,password);expect(_aes.default.encrypt).toHaveBeenCalledTimes(2);});test('Valid input, check returnValue',function(){var res=(0,_index.formatWalletInfo)(walletInfoInput,password,accountName);expect(res).toHaveProperty('walletInfo');expect(res).toHaveProperty('accountInfo');});});describe('formatAccountInfo',function(){var password='11111111',accountName='testName';var walletInfoInput={privateKey:'privateKey',mnemonic:'mnemonic',publicKey:'publicKey',xPrivateKey:'xPrivateKey'};test('The input of walletInfoInput does not exist',function(){expect((0,_index.formatAccountInfo)({},password,accountName)).toBeFalsy;});test('WalletInfoInput`privateKey exist but password does not exist',function(){expect((0,_index.formatAccountInfo)({privateKey:'privateKey'},'',accountName)).toBeFalsy;});test('The walletInfoInput does not contain publicKey, contain keyPair',function(){var res=(0,_index.formatAccountInfo)({keyPair:{getPublic:jest.fn().mockImplementation(function(){return{x:'xxx',y:'yyy'};})}},password,accountName);expect(res).toHaveProperty('publicKey');});test('Valid input, check generate AESEncryptPrivateKey',function(){_aes.default.encrypt=jest.fn();(0,_index.formatAccountInfo)(walletInfoInput,password,accountName);expect(_aes.default.encrypt).toHaveBeenCalledTimes(1);});test('Valid input, check the returnValue',function(){var res=(0,_index.formatAccountInfo)(walletInfoInput,password,accountName);expect(res).toHaveProperty('accountName');expect(res).toHaveProperty('accountType');expect(res).not.toHaveProperty('privateKey');expect(res).not.toHaveProperty('mnemonic');expect(res).not.toHaveProperty('xPrivateKey');expect(res).not.toHaveProperty('keyPair');expect(res).not.toHaveProperty('childWallet');});});describe('getAccountByMnemonic',function(){var AESEncryptMnemonic='AESEncryptMnemonic',password='11111111',BIP44Path=_wallet.DefaultBIP44Path;test('Valid input',function(){_aes.default.decrypt=jest.fn().mockReturnValue(true);_aelfSdk.default.wallet.getWalletByMnemonic=jest.fn();var res=(0,_index.getAccountByMnemonic)({AESEncryptMnemonic:AESEncryptMnemonic,password:password,BIP44Path:BIP44Path});expect(_aes.default.decrypt).toHaveBeenCalledTimes(1);expect(_aelfSdk.default.wallet.getWalletByMnemonic).toHaveBeenCalledTimes(1);expect(res).toBeFalsy;});test('The mnemonic does not exist',function(){_aes.default.decrypt=jest.fn().mockReturnValue(false);expect((0,_index.getAccountByMnemonic)({AESEncryptMnemonic:AESEncryptMnemonic,password:password,BIP44Path:BIP44Path})).toBeFalsy;});test('The AESEncryptMnemonic does not exist',function(){_aes.default.decrypt=jest.fn().mockReturnValue(false);expect((0,_index.getAccountByMnemonic)({AESEncryptMnemonic:'',password:password,BIP44Path:BIP44Path})).toBeFalsy;});});describe('getAccountByPrivateKey',function(){beforeEach(function(){_aelfSdk.default.wallet.getWalletByPrivateKey=jest.fn().mockReturnValue({BIP44Path:_wallet.DefaultBIP44Path});});var privateKey='1111';test('Valid input, get wallet from privateKey',function(){(0,_index.getAccountByPrivateKey)(privateKey);expect(_aelfSdk.default.wallet.getWalletByPrivateKey).toHaveBeenCalledTimes(1);});test('Valid input, the returnValue is not BIP44Path',function(){var res=(0,_index.getAccountByPrivateKey)(privateKey);expect(res).not.toHaveProperty('BIP44Path');});});describe('getNextBIP44Path',function(){test('The input of BIP44Path is valid',function(){expect((0,_index.getNextBIP44Path)("m/44'/1616'/0'/0/0")).toBe("m/44'/1616'/0'/0/1");});test('The input of BIP44Path is invalid',function(){expect((0,_index.getNextBIP44Path)("m/44'/1616'/0'/0/a")).toBe(_wallet.DefaultBIP44Path);});});describe('checkPasswordInput',function(){test('Password does not exist or the length less than 8',function(){expect((0,_index.checkPasswordInput)('')).toBe(_types.PasswordErrorMessage.passwordNotLong);expect((0,_index.checkPasswordInput)('111111')).toBe(_types.PasswordErrorMessage.passwordNotLong);});test('Password is invalid',function(){jest.mocked(_reg.isValidPassword).mockReturnValue(false);expect((0,_index.checkPasswordInput)('$#111111')).toBe(_types.PasswordErrorMessage.invalidPassword);});test('Password is valid',function(){jest.mocked(_reg.isValidPassword).mockReturnValue(true);expect((0,_index.checkPasswordInput)('12345678')).toBeUndefined();});});describe('checkWalletNameInput',function(){test('WalletName does not exist',function(){expect((0,_index.checkWalletNameInput)('')).toBe(_types.WalletNameErrorMessage.enterWalletName);});test('The length of walletName more than 30',function(){expect((0,_index.checkWalletNameInput)('1'.repeat(31))).toBe(_types.WalletNameErrorMessage.walletNameToLong);});test('the walletName is invalid',function(){expect((0,_index.checkWalletNameInput)('``test')).toBe(_types.WalletNameErrorMessage.invalidWalletName);});test('the walletName is valid',function(){expect((0,_index.checkWalletNameInput)('12345678')).toBeTruthy;});});describe('checkAccountNameInput',function(){test('AccountName does not exist',function(){expect((0,_index.checkAccountNameInput)('')).toBeUndefined();});test('The length of accountName more than 30',function(){expect((0,_index.checkAccountNameInput)('1'.repeat(31))).toBe(_types.AccountNameErrorMessage.walletNameToLong);});test('The accountName is invalid',function(){expect((0,_index.checkAccountNameInput)('``')).toBe(_types.AccountNameErrorMessage.invalidWalletName);});test('The accountName is valid',function(){jest.mocked(_reg.isValidWalletName).mockReturnValue(true);expect((0,_index.checkAccountNameInput)('123456')).toBeUndefined();});});describe('checkPinInput',function(){test('Extension platform, pin is not long enough',function(){jest.mocked(_.isExtension).mockReturnValue(true);jest.mocked(_reg.isValidPin).mockReturnValue(false);expect((0,_index.checkPinInput)('@#::*&^%(*&')).toBe(_types.PinErrorMessage.invalidPin);});test('Extension platform, pin is invalid',function(){jest.mocked(_.isExtension).mockReturnValue(true);expect((0,_index.checkPinInput)('')).toBe(_types.PinErrorMessage.PinNotLong);expect((0,_index.checkPinInput)('111')).toBe(_types.PinErrorMessage.PinNotLong);});test('Extension platform, pin is valid',function(){jest.mocked(_.isExtension).mockReturnValue(true);jest.mocked(_reg.isValidPin).mockReturnValue(true);expect((0,_index.checkPinInput)('111111')).toBeUndefined();});test('Expect extension platform, the pin is invalid',function(){jest.mocked(_.isExtension).mockReturnValue(false);expect((0,_index.checkPinInput)('11111111')).toBe(_types.PinErrorMessage.invalidPin);expect((0,_index.checkPinInput)('')).toBe(_types.PinErrorMessage.invalidPin);expect((0,_index.checkPinInput)('qqqqqq')).toBe(_types.PinErrorMessage.invalidPin);});test('Expect extension platform, the pin is valid',function(){expect((0,_index.checkPinInput)('111111')).toBeUndefined();});});