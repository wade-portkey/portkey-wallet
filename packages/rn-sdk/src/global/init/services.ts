import { Platform } from 'react-native';
import { initHeadlessTasks } from 'service/JsModules/BackgroundTasks';
import { initJSBatchedBridgeModules } from 'service/JsModules/BatchedBridges';
import { PortkeyModulesEntity } from 'service/native-modules';

const initJsMethodService = () => {
  if (Platform.OS === 'ios') {
    initJSBatchedBridgeModules();
  } else {
    initHeadlessTasks();
  }
};

ErrorUtils.setGlobalHandler(error => {
  PortkeyModulesEntity.NativeWrapperModule.onError('js', error.message, error.stack);
});

export { initJsMethodService };
