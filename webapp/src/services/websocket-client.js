export default {
  open: function (endpoint) {
    const ws = new WebSocket(endpoint);
    return {
      on: (eventType, handler) => {
        ws['on' + eventType] = handler;
      },
      send: data => ws.send(data)
    };
  }
};
