import * as config from './config';
import * as websocket from './src/websocket';
import * as reporters from './src/reporters';

export function start() {
  websocket.start(config.socketOptions);
  reporters.register(websocket.send);
}
