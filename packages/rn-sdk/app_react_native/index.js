/**
 * @format
 */
// console.log('11111!!')
// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import 'react-native-sdk-beta';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
const res = AppRegistry.getRegistry()
console.log('res', res);
console.log('init~')
