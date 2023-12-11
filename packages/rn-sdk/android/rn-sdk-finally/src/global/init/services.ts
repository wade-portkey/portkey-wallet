import { Platform } from 'react-native';
import { initHeadlessTasks } from '@portkey/rn-sdk/src/service/JsModules/BackgroundTasks';
import { initJSBatchedBridgeModules } from '@portkey/rn-sdk/src/service/JsModules/BatchedBridges';

const initJsMethodService = () => {
  if (Platform.OS === 'ios') {
    initJSBatchedBridgeModules();
  } else {
    initHeadlessTasks();
  }
};

export { initJsMethodService };
