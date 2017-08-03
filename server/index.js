'use strict';
const app = require('./app');
const db = require('../db');
const uuid = require('node-uuid');
const crypto = require('crypto');
const PORT = process.env.PORT || 3000;
const {
  ProfileController,
  RoomController,
  ChannelController,
  MessageController
} = require('./controllers');

const server = app.listen(PORT, () => {
  console.log(`Summit Server listening on port ${PORT}!`);
});

const io = require('socket.io').listen(server);
const roomVideoSockets = {};

io.on('connection', socket => {
  // Text
  socket.on('send', message => {
    io.to(message.channel_id).emit('message', message);
  });
  socket.on('join room', req => {
    console.log('joined room', req.roomId);
    socket.join(`/room/${req.roomId}`);
    console.log('user', req.user);
    socket.to(`/room/${req.roomId}`).emit('user entered', req.user);
  });
  socket.on('leave room', roomId => {
    socket.leave(`/room/${roomId}`);
  });
  socket.on('post channel', channel => {
    io.to(`/room/${channel.room_id}`).emit('add channel', channel);
  });
  socket.on('subscribe', channelId => {
    socket.join(channelId);
  });
  socket.on('unsubscribe', channelId => {
    socket.leave(channelId);
  });

  //Friends event
  socket.on('friend update', friend => {
    io.emit('friend update', friend)
  });

  //Direct Message event
  socket.on('Start direct message', direct => {
    console.log('direct', direct)
    io.emit('Start direct message', direct)
  });

  // Video
  socket.on('joinVideo', room => {
    if (!roomVideoSockets[room]) {
      roomVideoSockets[room] = {};
    } else if (roomVideoSockets[room][socket.id]) {
      console.log(`${socket.id} already in room!`);
      return;
    }

    for (const peerSocketId in roomVideoSockets[room]) {
      roomVideoSockets[room][peerSocketId].emit('addPeer', {
        peer_id: socket.id,
        should_create_offer: false
      });
      socket.emit('addPeer', { peer_id: peerSocketId, should_create_offer: true });
    }

    roomVideoSockets[room][socket.id] = socket;
  });

  socket.on('leaveVideo', room => {
    if (!roomVideoSockets[room][socket.id]) {
      console.log(`ERROR: ${socket.id} not in room ${room}`);
      return;
    }

    delete roomVideoSockets[room][socket.id];

    for (const peerSocketId in roomVideoSockets[room]) {
      socket.emit('removePeer', peerSocketId);
      roomVideoSockets[room][peerSocketId].emit('removePeer', socket.id);
    }
    socket.emit('removePeer', socket.id);
  });

  socket.on('relaySessionDescription', req => {
    const { room, peer_id, session_description } = req;
    if (roomVideoSockets[room][peer_id]) {
      roomVideoSockets[room][peer_id].emit('sessionDescription', {
        peer_id: socket.id,
        session_description
      });
    }
  });

  socket.on('relayICECandidate', req => {
    const { room, peer_id, ice_candidate } = req;
    if (roomVideoSockets[room][peer_id]) {
      roomVideoSockets[room][peer_id].emit('iceCandidate', {
        peer_id: socket.id,
        ice_candidate
      });
    }
  });
});
