/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React, { Component } from 'react';
import App from './src/app';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/redux/configureStore';

//////////////////////////

const store = configureStore()


const RNRedux = () => (
  <Provider store = { store }>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
