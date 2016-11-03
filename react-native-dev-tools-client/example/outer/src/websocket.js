import socketCluster from 'socketcluster-client';

export function connect(options) {
  const socket = socketCluster.connect(options);

  socket.on('connect', () => {
    alert('CONNECTED');
  });

  socket.on('rand', (num) => {
    alert('RANDOM: ' + num);
  });
}

