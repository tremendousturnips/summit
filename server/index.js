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
      // "urls": ["turn:your.turn.servers.here"],
      // "secret": "turnserversharedsecret",
      // "expiry": 86400
      url: 'turn:global.turn.twilio.com:3478?transport=tcp',
      username: 'f65cf69e15b57ecc4f6b9d5fc0e4242b244b50d7dae1c7bf9133ea2a3b86081c',
      credential: '3CYsqO4NpVKT4uLXjndrXgCn1wMBv86rabLYZZdM6NE='
    }
  ]
};

const server = app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT + '!');
});

const io = require('socket.io').listen(server);

let channels = {};
let sockets = {};

io.on('connection', socket => {
  socket.on('send', message => {
    io.to(message.channel_id).emit('message', message);
  });
  socket.on('subscribe', roomId => {
    socket.join(roomId);
  });
  socket.on('unsubscribe', roomId => {
    socket.leave(roomId);
  });
});

io.sockets.on('connection', function(socket) {
  socket.channels = {};
  sockets[socket.id] = socket;

  console.log('[' + socket.id + '] connection accepted');
  socket.on('disconnect', function() {
    for (var channel in socket.channels) {
      part(channel);
    }
    console.log('[' + socket.id + '] disconnected');
    delete sockets[socket.id];
  });

  socket.on('join', function(config) {
    console.log('[' + socket.id + '] join ', config);
    var channel = config.channel;
    var userdata = config.userdata;

    if (channel in socket.channels) {
      console.log('[' + socket.id + '] ERROR: already joined ', channel);
      return;
    }

    if (!(channel in channels)) {
      channels[channel] = {};
    }

    for (var id in channels[channel]) {
      channels[channel][id].emit('addPeer', { peer_id: socket.id, should_create_offer: false });
      socket.emit('addPeer', { peer_id: id, should_create_offer: true });
    }

    channels[channel][socket.id] = socket;
    socket.channels[channel] = channel;
  });

  function part(channel) {
    console.log('[' + socket.id + '] part ');

    if (!(channel in socket.channels)) {
      console.log('[' + socket.id + '] ERROR: not in ', channel);
      return;
    }

    delete socket.channels[channel];
    delete channels[channel][socket.id];

    for (var id in channels[channel]) {
      channels[channel][id].emit('removePeer', { peer_id: socket.id });
      io.emit('removePeer', { peer_id: id });
    }
  }

  socket.on('part', part);

  socket.on('relayICECandidate', function(config) {
    let peer_id = config.peer_id;
    let ice_candidate = config.ice_candidate;
    console.log('[' + socket.id + '] relaying ICE candidate to [' + peer_id + '] ', ice_candidate);

    if (sockets[peer_id]) {
      sockets[peer_id].emit('iceCandidate', { peer_id: socket.id, ice_candidate: ice_candidate });
    }
  });

  socket.on('relaySessionDescription', function(config) {
    let peer_id = config.peer_id;
    let session_description = config.session_description;
    console.log(
      '[' + socket.id + '] relaying session description to [' + peer_id + '] ',
      session_description
    );

    if (sockets[peer_id]) {
      sockets[peer_id].emit('sessionDescription', {
        peer_id: socket.id,
        session_description: session_description
      });
    }
  });
});
