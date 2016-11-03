import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class example extends Component {
  componentDidMount() {
    require('./outer').start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          React Native Dev Tools!
        </Text>
        <TouchableOpacity onPress={() => this.onClickConsoleLog()}>
          <Text style={styles.instructions}>
            console log
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onClickConsoleWarn()}>
          <Text style={styles.instructions}>
            console warn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onClickConsoleError()}>
          <Text style={styles.instructions}>
            console error
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onClickHttpGet()}>
          <Text style={styles.instructions}>
            http get
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  onClickConsoleLog() {
    console.log('this is a message from console.log');
  }

  onClickConsoleWarn() {
    console.log('this is a warning from console.warn');
  }

  onClickConsoleError() {
    console.log('this is an error from console.error');
  }

  onClickHttpGet() {
    fetch('https://www.google.com');
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

AppRegistry.registerComponent('example', () => example);

