'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.PORT || 3000;

var server = app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});

var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
  console.log('user connected');
  socket.on('test', (test) => {
    console.log('got test', test);
    socket.emit('test', {test:'response'});
  });
});