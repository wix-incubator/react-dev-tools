const config = require('./config');
const websocket = require('./src/websocket');

module.exports = {
  start() {
    websocket.start(config.socketOptions);
  }
};
