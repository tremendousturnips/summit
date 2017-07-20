'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.PORT || 3000;
const {
  ProfileController,
  RoomController,
  ChannelController,
  MessageController
} = require('./controllers');

const server = app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT + '!');
});

const io = require('socket.io').listen(server);

io.on('connection', socket => {
  console.log('user connected');
<<<<<<< HEAD
  socket.on('send', message => {
    io.to(message.channel_id).emit('message', message);
=======
  socket.on('send', (message) => {
    socket.to(message.channel_id).emit('message', message);
>>>>>>> Change sequence of actions such that client first sees their own message sent before writing to db
  });
  socket.on('subscribe', roomid => {
    socket.join(roomid);
  });
  socket.on('unsubscribe', roomid => {
    socket.leave(roomid);
  });
});
