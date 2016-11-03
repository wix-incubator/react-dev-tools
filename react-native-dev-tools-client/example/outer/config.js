export const socketOptions = {
  protocol: 'http',
  hostname: 'localhost',
  port: 3030,
  autoReconnect: true,
  autoReconnectOptions: {
    randomness: 60000
  }
};
