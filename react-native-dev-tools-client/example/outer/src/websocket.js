export async function start(options) {
  const ws = new WebSocket(`${options.protocol}://${options.hostname}:${options.port}`); //eslint-disable-line

  ws.onopen = () => {
    ws.send('something');
  };

  ws.onmessage = (e) => {
    // a message was received
    alert(e.data);
  };

  ws.onerror = (e) => {
    // an error occurred
    alert(e.message);
  };

  ws.onclose = (e) => {
    // connection closed
    alert(e.code, e.reason);
  };

}
