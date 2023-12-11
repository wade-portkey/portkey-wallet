Object.defineProperty(exports,"__esModule",{value:true});exports.WalletError=exports.BaseWalletError=void 0;var _types=require("../../../utils/wallet/types");var BaseWalletError=exports.BaseWalletError=function(BaseWalletError){BaseWalletError["noCreateWallet"]="Please Create an Wallet First!";BaseWalletError["pinFailed"]="Pin Verification Failed!";BaseWalletError["decryptionFailed"]="Decryption Failed!";BaseWalletError["invalidPrivateKey"]="Invalid Private Key";BaseWalletError["walletExists"]="Wallet Already Exists!";BaseWalletError["caAccountExists"]="Account Already Exists!";BaseWalletError["caAccountNotExists"]="CA Account Not Exists!";return BaseWalletError;}({});var WalletError=exports.WalletError=Object.assign({},BaseWalletError,_types.PinErrorMessage);