/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';


const ROOT = '/Users/feizheng/github/rn-module-webview-bridge/WebViewBridgeExample';

export default class WebViewBridgeExample extends Component {
  _onNavigationStateChange = e => {
    const { url } = e;
    const bridgeData = decodeURIComponent(url).slice(9);
    if( url.indexOf('dacang://')>-1){
      Alert.alert(
        'DEBUG:',
        bridgeData,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      );
    }
  };

  render() {
    return (
      <WebView 
        style={{ marginTop: 40 }} 
        onNavigationStateChange = { this._onNavigationStateChange}
        source={{ uri: `${ROOT}/src/assets/html/test1.html`}} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('WebViewBridgeExample', () => WebViewBridgeExample);
