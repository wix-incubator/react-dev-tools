import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('./services/websocket-client');

const websocketClientMock = require('./services/websocket-client');

websocketClientMock.default.open.mockReturnValue({
  on: function () {}
});

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});
