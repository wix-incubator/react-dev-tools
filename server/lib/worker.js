var path = require('path');
var express = require('express');

var bodyParser = require('body-parser');
var cors = require('cors');

module.exports.run = function(worker) {
  var mainApp = express();

  var httpServer = worker.httpServer;
  var scServer = worker.scServer;

  httpServer.on('request', express().use(process.env.MOUNT_POINT, mainApp));

  mainApp.set('view engine', 'ejs');
  mainApp.set('views', path.resolve(__dirname, '..', 'views'));
  
  mainApp.get('/', function(req, res) {
    res.render('index', { port: worker.options.port });
  });

  mainApp.get('/health/is_alive', function(req, res) {
    res.end();
  });


  mainApp.use(cors({ methods: 'POST' }));
  mainApp.use(bodyParser.json());
  mainApp.post('/', function(req, res) {
    if (!req.body) return res.status(404).end();
    scServer.exchange.publish('log', req.body);
    res.send('OK');
  });

  scServer.addMiddleware(scServer.MIDDLEWARE_EMIT, function (req, next) {
    var channel = req.event;
    var data = req.data;
    if (channel.substr(0, 3) === 'sc-' || channel === 'respond' || channel === 'log') {
      scServer.exchange.publish(channel, data);
    } else if (channel === 'log-noid') {
      scServer.exchange.publish('log', { id: req.socket.id, data: data });
    }
    next();
  });

  scServer.on('connection', function(socket) {
    var channelToWatch, channelToEmit;
    socket.on('login', function (credentials, respond) {
      if (credentials === 'master') {
        channelToWatch = 'respond'; channelToEmit = 'log';
      } else {
        channelToWatch = 'log'; channelToEmit = 'respond';
      }
      worker.exchange.subscribe('sc-' + socket.id).watch(function(msg) {
        socket.emit(channelToWatch, msg);
      });
      respond(null, channelToWatch);
    });
    socket.on('disconnect', function() {
      var channel = worker.exchange.channel('sc-' + socket.id);
      channel.unsubscribe(); channel.destroy();
      scServer.exchange.publish(
        channelToEmit,
        { id: socket.id, type: 'DISCONNECTED' }
      );
    });
  });
};
