import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Log from './components/Log';
import AppStateView from './components/AppStateView';
import websocketClient from './services/websocket-client';

let ws;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [
        {type: 'console', subtype: 'log', time: Date.now(), payload: {message: 'Hello, World!'}},
        {type: 'console', subtype: 'log', time: Date.now(), payload: {message: 'Something, something, something'}},
        {type: 'console', subtype: 'error', time: Date.now(), payload: {message: 'TypeError: all when wrong'}},
        {type: 'console', subtype: 'warn', time: Date.now(), payload: {message: 'Don\'t eat too many sweets'}},
      ]
    };
  }

  componentDidMount() {
    ws = websocketClient.open('ws://localhost:3030/');
    ws.on('message', event => {
      this.setState({
        entries: [...this.state.entries, JSON.parse(event.data)]
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-header">React Dev Tools</h1>
        <Log entries={this.state.entries}/>
        <AppStateView />
      </div>
    );
  }
}

export default App;
