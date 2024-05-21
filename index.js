/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Root} from './app/containers';

const App = () => {
  return <Root />;
};

AppRegistry.registerComponent(appName, () => App);
