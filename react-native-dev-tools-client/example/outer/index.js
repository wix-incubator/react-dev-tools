const websocket = require('./src/websocket');
const options = require('./config');

module.exports = {
  start() {
    websocket.connect(options);
  }
};
