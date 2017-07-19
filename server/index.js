'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.PORT || 3000;
const {ProfileController, RoomController, ChannelController, MessageController} = require('./controllers');

var server = app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT + '!');
});

var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
  console.log('user connected');
  socket.on('send', (message) => {
    io.to(message.channelId).emit('message', message);
  });
  socket.on('subscribe', (roomid) => {
    socket.join(roomid);
  });
  socket.on('unsubscribe', (roomid) => {
    socket.leave(roomid);
  });
});