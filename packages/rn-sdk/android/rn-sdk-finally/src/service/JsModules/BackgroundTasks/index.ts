import { AppRegistry } from 'react-native';
import { JsModuleEntries } from 'service/JsModules/BatchedBridges';

/**
 * Register all headless tasks from JsModuleEntries.
 *
 * Remember that headless tasks have no module name.
 */
const initHeadlessTasks = () => {
  Object.entries(JsModuleEntries).forEach(([name, module]) => {
    console.log('initHeadlessTasks : ', `initHeadlessTasks called, module name: ${name}`);
    Object.entries(module).forEach(([key, value]) => {
      console.log('initHeadlessTasks : ', `initHeadlessTasks called, key: ${key}`);
      AppRegistry.registerHeadlessTask(key, () => value);
    });
  });
};

export { initHeadlessTasks };
