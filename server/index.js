const express = require('express'),
  fetch = require('node-fetch'),
  ws = require('nodejs-websocket');

const argv = require('minimist')(process.argv.slice(2));
const mountPoint = '/';
const port = process.env.PORT || parseInt(argv['port']) || 8080;

const clients = new Clients();

ws.createServer((conn) => clients.connected(conn))
  .listen(port);

function Clients() {
  let nextClientId = 1;
  const clients = {};

  this.connected = (conn) => {
    let clientId = `${nextClientId++}`;
    let client = new Client(conn, clientId, sendEveryoneExcept.bind(this, clientId));
    
    clients[clientId] = client;

    console.log(`Client connected ${clientId}`);
  
    conn.on('close', function (code, reason) {
      console.log(`Client disconnected ${clientId}: ${code}; ${reason}`);

      delete clients[clientId];
    });

    client.send({
      type: 'connected'
    });
  }

  function sendEveryoneExcept(clientIdToExclude, message) {
    for (let clientId in clients) {
      if (clientId === clientIdToExclude) {
        continue;
      }

      clients[clientId].send(message);
    }
  };
}

function Client(connection, clientId, broadcast) {
  connection.on('text', function (messageText) {
    console.log(`Received ${messageText} from ${clientId}`);

    let message = JSON.parse(messageText);

    broadcast(message);
  });

  this.send = (message) => {
    try {
      const messageText = JSON.stringify(message);

      console.log(`Sending ${messageText} to ${clientId}`);

      connection.sendText(messageText);
    } catch(e) {
      console.error(`Failed sending message to ${clientId}`, e);
    }
  };
};

// express()
//   .get(mountPoint, (req, res, next) => {
//     fetch(`http://127.0.0.1:${process.env.PORT}${process.env.MOUNT_POINT}/health/is_alive`)
//       .then(resp => resp.ok ? res.end() : res.status(500).end())
//       .catch(next);
//   })
//   .listen(process.env.MANAGEMENT_PORT || parseInt(argv['management-port']), () => {
//     new SocketCluster({
//       port: process.env.PORT || parseInt(argv['port']) || 8080,
//       path: mountPoint, 
//       appName: process.env.APP_NAME || 'dev',
//       workers: 2,
//       workerController: './lib/worker.js',
//       allowClientPublish: false,
//       protocol: 'http'
//     });
//   });

