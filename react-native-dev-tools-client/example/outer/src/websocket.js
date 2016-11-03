let ws;

export function start(options) {
  if (ws) {
    ws.close();
  }

  ws = new WebSocket(`${options.protocol}://${options.hostname}:${options.port}`); //eslint-disable-line

  ws.onopen = () => {
    alert(`received: ${e.data}`);
  };

  ws.onmessage = (e) => {
    alert(`received: ${e.data}`);
  };

  ws.onerror = (e) => {
    alert(`error: ${e.message}`);
  };

  ws.onclose = (e) => {
    alert(`closed: ${e.code}, ${e.reason}`);
  };
}

export async function send(msg) {
  //TODO what if we aren't ready?
  ws.send(msg);
}
