import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';
import { WalletModule } from '../SubModules/WalletModule';
import { BaseJSModule } from '../types';

enum JSModuleIdentifier {
  WALLET_MODULE = 'WalletModule',
}

export const JsModuleEntries: { [key: string]: BaseJSModule } = {
  [JSModuleIdentifier.WALLET_MODULE]: WalletModule,
};

export const initJSBatchedBridgeModules = () => {
  Object.entries(JsModuleEntries).forEach(([key, value]) => {
    BatchedBridge.registerCallableModule(key, value);
  });
};
