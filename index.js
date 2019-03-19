/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import App from './src/splash';
// import App from './App2';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
