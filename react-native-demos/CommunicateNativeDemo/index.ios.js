/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;
var React = require('react-native');
var ShareManager = React.NativeModules.TestManager;
var NativeAppEventEmitter= React.NativeAppEventEmitter;
//监听native事件
var subscription = NativeAppEventEmitter.addListener(
  'EventReminder',
  (reminder) => alert(reminder.name)
);
// Somewhere in your component...
 
function onPress(){
  alert("dsd")
      // ShareManager.shareURL("someURL");
 ShareManager.addEvent('Birthday Party', '4 Privet Drive, Surrey');

};


function onPress1(){
      ShareManager.findEvents((error,events) => {
        if (error) {

            alert(error)

        }else{

           alert(events)

        };


})

};


function onPress2(){
 

};

var CommunicateNativeDemo = React.createClass({
  //注意在componentWillUnmount的时候移除对Native事件的监听
  componentWillUnmount: function() {
        subscription.remove();
    },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={onPress}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions} onPress={onPress1}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions} onPress={onPress1}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
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
        marginTop: 15,

  },
});

AppRegistry.registerComponent('CommunicateNativeDemo', () => CommunicateNativeDemo);
