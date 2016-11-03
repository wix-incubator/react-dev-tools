import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// import Filter from './components/Filter';
import Log from './components/Log';
import AppStateView from './components/AppStateView';
import websocketClient from './services/websocket-client';

class App extends Component {
  constructor(props) {
    super(props);

    this.send = this.send.bind(this);

    this.state = {
      entries: [
        {type: 'console', subtype: 'log', time: Date.now(), payload: {message: 'Hello, World!'}},
        {type: 'console', subtype: 'error', time: Date.now(), payload: {message: 'TypeError: all when wrong'}},
        {type: 'console', subtype: 'warn', time: Date.now(), payload: {message: 'Don\'t eat too many sweets'}},
        {type: 'console', subtype: 'error', time: Date.now(), payload: {
          message: 'WebSocket network error: The operation couldn’t be completed. Connection refused',
          stacktrace: [
            {
              "file": "react-dev-tools/react-native-dev-tools-client/example/outer/src/reporters/stacktraceGenerator.js",
              "methodName": "generate$",
              "lineNumber": 5,
              "column": 0
            },
            {
              "file": "react-dev-tools/react-native-dev-tools-client/example/node_modules/regenerator-runtime/runtime.js",
              "methodName": "tryCatch",
              "lineNumber": 62,
              "column": 0
            }
          ]
        }}
      ],
      appState: {
        array: [1, 2, 3],
        bool: true,
        object: {
          foo: 'bar'
        }
      }
    };
  }

  componentDidMount() {
    this.ws = websocketClient.open('ws://localhost:3030/');

    this.ws.on('message', event => {
      const message = JSON.parse(event.data);

      if (message.type === 'app-state') {
        this.setState({
          appState: message.payload
        });

        return;
      }

      this.setState({
        entries: [...this.state.entries, message]
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-viewport">
          <header>
            <h1 className="App-header">Console and Network Log</h1>
          </header>
          <Log entries={this.state.entries}/>
        </div>
        <AppStateView send={this.send} appState={this.state.appState} />
      </div>
    );
  }

  send(message) {
    // if (this.ws !== undefined) {
      this.ws.send(JSON.stringify(message));
    // }
  }
}

export default App;
