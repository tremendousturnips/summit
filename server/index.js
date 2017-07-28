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
    socket.to(message.channel_id).emit('message', message);
  });
  socket.on('join room', roomId => {
    console.log('joined room');
    socket.join(`/room/${roomId}`);
  });
  socket.on('leave room', roomId => {
    socket.leave(`/room/${roomId}`);
  });
  socket.on('post channel', channel => {
    io.to(`/room/${channel.room_id}`).emit('add channel', channel);
  });
  socket.on('subscribe', channelId => {
    console.log('subscribed to namespace:', channelId);
    socket.join(channelId);
  });
  socket.on('unsubscribe', channelId => {
    socket.leave(channelId);
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
      // roomVideoSockets[room][peerSocketId].emit('removePeer', socket.id);
      socket /*.to(roomVideoSockets[room])*/
        .emit('removePeer', socket.id); // necessary ??? - isn't socket destroyed?
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

  socket.on('relaySessionDescription', req => {
    const { room, peer_id, session_description } = req;

    if (roomVideoSockets[room][peer_id]) {
      roomVideoSockets[room][peer_id].emit('sessionDescription', {
        peer_id: socket.id,
        session_description
      });
    }
  });
});
