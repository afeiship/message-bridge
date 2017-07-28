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
  Button,
  WebView
} from 'react-native';


const ROOT = '/Users/feizheng/github/rn-module-webview-bridge/WebViewBridgeExample';

export default class WebViewBridgeExample extends Component {
  state = {
    localData: null
  };

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

  _onMessage = e => {
    Alert.alert(
      'INFO-MESSAGE:',
      JSON.stringify(e.nativeEvent.data),
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    );

    this.setState({
      localData: e.nativeEvent.data
    })
  };

  _nativePresse = e => {
    const { webview } = this.refs;
    webview.injectJavaScript('window.h5Method()');
  };


  _onLoadStart = e => {
    const { webview } = this.refs;
    const webviewParams = {
      user_id:1234,
      data:1234,
      otherData:['123','23']
    };
    webview.injectJavaScript('window.initialParams('+JSON.stringify(webviewParams)+')')
  }

  render() {
    return (
      <View style={[styles.row]}>
        <View style={[ styles.col,styles.size3]}>
        <WebView
          ref="webview"
          contentInset={{ top:10, bottom:20, left:0,right:0}}
          style={{
            backgroundColor:"#eee",
          }}
          onLoadStart={this._onLoadStart}
          onMessage ={ this._onMessage}
          onNavigationStateChange = { this._onNavigationStateChange}
          source={{ uri: `${ROOT}/src/assets/html/test1.html`}}>
        </WebView>
        </View>
        <View style={[ styles.col]}>
          <Button style={[{
            position:'relative',
            backgroundColor:'#f00',
            color:'#f00'
          },styles.container]} title="Native Button [ Native call H5 ]" onPress={this._nativePresse} />
          <Text style={[styles.p50]}>
            { JSON.stringify(JSON.parse(this.state.localData),null,2) }
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row:{
    flexDirection: 'column',
    height:'100%'
  },
  col: {
    flex: 1,
    borderWidth:1,
    borderStyle:'solid'
  },
  size1:{
    flex:2
  },
  size3:{
    flex:2
  },
  p50:{
    paddingHorizontal:50
  },
  btn:{
    backgroundColor:'#4cd964'
  },
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
