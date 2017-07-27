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

const config = {
  stunservers: [
    {
      //      "url": "stun:stun.l.google.com:19302"
      url: 'stun:global.stun.twilio.com:3478?transport=udp'
    }
  ],
  turnservers: [
    {
      url: 'turn:global.turn.twilio.com:3478?transport=udp',
      username: '7823fd6b34baece7e291276e43969bc5d8a7ce41ad78ba86b9ca8b7f9a7b2e13',
      credential: 'Yc5kCs9eC5JOeps4mbmURNmUVjWdJof9N3MItd51zx8='
    },
    {
      url: 'turn:global.turn.twilio.com:3478?transport=tcp',
      username: '7823fd6b34baece7e291276e43969bc5d8a7ce41ad78ba86b9ca8b7f9a7b2e13',
      credential: 'Yc5kCs9eC5JOeps4mbmURNmUVjWdJof9N3MItd51zx8='
    },
    {
      url: 'turn:global.turn.twilio.com:443?transport=tcp',
      username: '7823fd6b34baece7e291276e43969bc5d8a7ce41ad78ba86b9ca8b7f9a7b2e13',
      credential: 'Yc5kCs9eC5JOeps4mbmURNmUVjWdJof9N3MItd51zx8='
    }
  ]
};

const server = app.listen(PORT, () => {
  console.log(`Summit Server listening on port ${PORT}!`);
});


const io = require('socket.io').listen(server);
const roomVideoSockets = {};

io.on('connection', socket => {
  // DO NOT TOUCH
  socket.on('send', message => {
    socket.to(message.channel_id).emit('message', message);
  });
  socket.on('subscribe', channelId => {
    console.log('subscribed to namespace:', channelId);
    socket.join(channelId);
  });
  socket.on('unsubscribe', channelId => {
    socket.leave(channelId);
  });
  // DO NOT TOUCH
  // const videoSockets = {};

  // videoSockets[socket.id] = socket;

  // socket.on('leaveVideo', () => {
  //   for (const peerSocketId in roomVideoSockets[room]) {
  //     socket.emit('part', room);
  //   }
  //   delete videoSockets[socket.id];
  //   console.log(`${socket.id} disconnected`);
  // });

  socket.on('part', room => {
    if (!roomVideoSockets[room][socket.id]) {
      console.log(`ERROR: ${socket.id} not in room ${room}`);
      return;
    }

    delete roomVideoSockets[room][socket.id];

    for (const peerSocketId in roomVideoSockets[room]) {
      roomVideoSockets[room][peerSocketId].emit('removePeer', socket.id);
      socket.emit('removePeer', peerSocketId); // necessary ??? - isn't socket destroyed?
    }
  });

  socket.on('joinVideo', room => {
    if (!roomVideoSockets[room]) {
      roomVideoSockets[room] = {};
    } else if (roomVideoSockets[room][socket.id]) {
      console.log(`${socket.id} already in room!`);
      return;
    }

    for (const peerSocketId in roomVideoSockets[room]) {
      console.log('HALLO');
      roomVideoSockets[room][peerSocketId].emit('addPeer', {
        peer_id: socket.id,
        should_create_offer: false
      });
      socket.emit('addPeer', { peer_id: peerSocketId, should_create_offer: true });
    }

    roomVideoSockets[room][socket.id] = socket;
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
