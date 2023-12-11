var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.checkAccountNameInput=checkAccountNameInput;exports.checkPasswordInput=checkPasswordInput;exports.checkPinInput=checkPinInput;exports.checkWalletNameInput=checkWalletNameInput;exports.handleWalletInfo=exports.getNextBIP44Path=exports.getAccountByPrivateKey=exports.getAccountByMnemonic=exports.formatWalletInfo=exports.formatAccountInfo=void 0;var _aes=_interopRequireDefault(require("../aes"));var _aelfSdk=_interopRequireDefault(require("aelf-sdk"));var _wallet=require("../../constants/wallet");var _types=require("./types");var _reg=require("../reg");var _misc=require("../../constants/misc");var _=require("./..");var handleWalletInfo=exports.handleWalletInfo=function handleWalletInfo(walletInfo){var tmpWallet=Object.assign({},walletInfo);if(!tmpWallet.publicKey){var publicKey=tmpWallet.keyPair.getPublic();tmpWallet.publicKey={x:publicKey.x.toString('hex'),y:publicKey.y.toString('hex')};}tmpWallet.keyPair&&delete tmpWallet.keyPair;tmpWallet.childWallet&&delete tmpWallet.childWallet;return tmpWallet;};var formatWalletInfo=exports.formatWalletInfo=function formatWalletInfo(walletInfoInput,password,accountName){try{if(!walletInfoInput||walletInfoInput.privateKey&&!password){return false;}var walletInfo=Object.assign({},walletInfoInput);walletInfo.AESEncryptPrivateKey=_aes.default.encrypt(walletInfo.privateKey,password);walletInfo.AESEncryptMnemonic=walletInfo.mnemonic?_aes.default.encrypt(walletInfo.mnemonic,password):null;if(!(walletInfo!=null&&walletInfo.publicKey)){var publicKey=walletInfo.keyPair.getPublic();walletInfo.publicKey={x:publicKey.x.toString('hex'),y:publicKey.y.toString('hex')};}delete walletInfo.privateKey;delete walletInfo.mnemonic;delete walletInfo.xPrivateKey;walletInfo.keyPair&&delete walletInfo.keyPair;walletInfo.childWallet&&delete walletInfo.childWallet;var accountInfo=Object.assign({},walletInfo,{accountName:accountName||'Account 1',accountType:'Create'});delete accountInfo.AESEncryptMnemonic;delete accountInfo.walletName;return{walletInfo:walletInfo,accountInfo:accountInfo};}catch(error){return false;}};var formatAccountInfo=exports.formatAccountInfo=function formatAccountInfo(walletInfoInput,password,accountName){var accountType=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'Create';try{if(!walletInfoInput||walletInfoInput.privateKey&&!password){return false;}var walletInfo=Object.assign({},walletInfoInput);walletInfo.AESEncryptPrivateKey=_aes.default.encrypt(walletInfo.privateKey,password);if(!(walletInfo!=null&&walletInfo.publicKey)){var publicKey=walletInfo.keyPair.getPublic();walletInfo.publicKey={x:publicKey.x.toString('hex'),y:publicKey.y.toString('hex')};}delete walletInfo.privateKey;delete walletInfo.mnemonic;delete walletInfo.xPrivateKey;delete walletInfo.keyPair;delete walletInfo.childWallet;var accountInfo=Object.assign({},walletInfo,{accountName:accountName,accountType:accountType});return accountInfo;}catch(error){return false;}};var getAccountByMnemonic=exports.getAccountByMnemonic=function getAccountByMnemonic(_ref){var AESEncryptMnemonic=_ref.AESEncryptMnemonic,password=_ref.password,BIP44Path=_ref.BIP44Path;var mnemonic=_aes.default.decrypt(AESEncryptMnemonic,password);if(!mnemonic)return false;return _aelfSdk.default.wallet.getWalletByMnemonic(mnemonic,BIP44Path);};var getAccountByPrivateKey=exports.getAccountByPrivateKey=function getAccountByPrivateKey(privateKey){var accountInfo=_aelfSdk.default.wallet.getWalletByPrivateKey(privateKey);delete accountInfo.BIP44Path;return accountInfo;};var getNextBIP44Path=exports.getNextBIP44Path=function getNextBIP44Path(BIP44Path){var BIPArr=BIP44Path.split('/');if(isNaN(+BIPArr[BIPArr.length-1])){return _wallet.DefaultBIP44Path;}BIPArr.splice(-1,1,(+BIPArr[BIPArr.length-1]+1).toString());return BIPArr.join('/');};function checkPasswordInput(password){if(!password||password.length<8)return _types.PasswordErrorMessage.passwordNotLong;if(!(0,_reg.isValidPassword)(password))return _types.PasswordErrorMessage.invalidPassword;}function checkWalletNameInput(walletName){if(!walletName)return _types.WalletNameErrorMessage.enterWalletName;if(walletName.length>30)return _types.WalletNameErrorMessage.walletNameToLong;if(!(0,_reg.isValidWalletName)(walletName))return _types.WalletNameErrorMessage.invalidWalletName;}function checkAccountNameInput(accountName){if(!accountName)return;if(accountName.length>30)return _types.AccountNameErrorMessage.walletNameToLong;if(!(0,_reg.isValidWalletName)(accountName))return _types.AccountNameErrorMessage.invalidWalletName;}function checkPinInput(pin){if((0,_.isExtension)()){if(!pin||pin.length<6)return _types.PinErrorMessage.PinNotLong;if(!(0,_reg.isValidPin)(pin))return _types.PinErrorMessage.invalidPin;return;}if(!pin||pin.length!==_misc.PIN_SIZE||_misc.ZERO.plus(pin).isNaN())return _types.PinErrorMessage.invalidPin;}