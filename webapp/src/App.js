import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Log from './components/Log';
import websocketClient from './services/websocket-client';

let ws;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: []
    };
  }

  componentDidMount() {
    ws = websocketClient.open('ws://localhost:3030/');
    ws.on('open', () => ws.send('Hello'));
    ws.on('message', event => {
      this.setState({
        entries: [...this.state.entries, event.data]
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Log entries={this.state.entries}/>
      </div>
    );
  }
}

export default App;
