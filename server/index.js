const SocketCluster = require('socketcluster').SocketCluster,
  express = require('express'),
  fetch = require('node-fetch');

const argv = require('minimist')(process.argv.slice(2));

express()
  .get(process.env.MOUNT_POINT + '/health/deployment/test', (req, res, next) => {
    fetch(`http://127.0.0.1:${process.env.PORT}${process.env.MOUNT_POINT}/health/is_alive`)
      .then(resp => resp.ok ? res.end() : res.status(500).end())
      .catch(next);
  })
  .listen(process.env.MANAGEMENT_PORT || parseInt(argv['management-port']), () => {
    new SocketCluster({
      port: process.env.PORT || parseInt(argv['port']) || 8080,
      path: process.env.MOUNT_POINT || argv['context-path'] || '',
      appName: process.env.APP_NAME || 'dev',
      workers: 2,
      workerController: './lib/worker.js',
      allowClientPublish: false,
      protocol: 'http'
    });
  });

