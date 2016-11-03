const express = require('express'),
  fetch = require('node-fetch'),
  ws = require('nodejs-websocket');

const argv = require('minimist')(process.argv.slice(2));
const mountPoint = '/';
const port = process.env.PORT || parseInt(argv['port']) || 8080;

ws.createServer(function (conn) {
    console.log("New connection")

    conn.on("text", function (str) {
        console.log("Received "+str)
        conn.sendText(str.toUpperCase()+"!!!")
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
}).listen(port, '0.0.0.0')

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

