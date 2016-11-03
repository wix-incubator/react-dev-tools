import _ from 'lodash';
let ws;

export function start(options) {
  if (ws) {
    ws.close();
  }

  ws = new WebSocket(`${options.protocol}://${options.hostname}:${options.port}`); //eslint-disable-line

  ws.onopen = () => {
    //alert(`opened`);
  };

  ws.onmessage = (e) => {
    //alert(`received: ${e.data}`);
  };

  ws.onerror = (e) => {
    //alert(`error: ${e.message}`);
  };

  ws.onclose = (e) => {
    //alert(`closed: ${e.code}, ${e.reason}`);
  };
}

//TODO what if we aren't ready?
export function send(msg) {
  return;
  if (!_.isString(msg)) {
    ws.send(JSON.stringify(msg));
  } else {
    ws.send(msg);
  }
}
