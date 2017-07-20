const models = require('../models');
const tables = [
  'auths',
  'profiles',
  'messages',
  'friends',
  'rooms',
  'channels',
  'roles',
  'directs'
];

exports.seed = function(knex, Promise) {
  const tableDeletes = tables.map(tablename => knex.raw(`truncate table ${tablename} cascade`));
  // const tableDeletes = tables.map(tablename => knex(tablename).del());
  return Promise.all(tableDeletes)
    .then(() => {
      return knex('profiles').insert([
        {
          first: 'firstname1',
          last: 'lastname1',
          display: 'user1',
          phone: '',
          image: '',
          bio: ''
        },
        {
          first: 'firstname2',
          last: 'lastname2',
          display: 'user2',
          phone: '',
          image: '',
          bio: ''
        },
        {
          first: 'firstname3',
          last: 'lastname3',
          display: 'user3',
          phone: '',
          image: '',
          bio: ''
        }
      ]);
    })
    .then(() => {
      return knex('auths').insert([
        { type: 'local', password: 'pass123', profile_id: 1 },
        { type: 'local', password: 'pass123', profile_id: 2 },
        { type: 'local', password: 'pass123', profile_id: 3 }
      ]);
    })
    .then(() => {
      return knex('friends').insert([
        { user_id: 1, friend_id: 2 },
        { user_id: 2, friend_id: 1 }
      ]);
    })
    .then(() => {
      return knex('rooms').insert([
        { name: 'room1', description: 'description1' },
        { name: 'room2', description: 'description2' },
        { name: 'room3', description: 'description3' }
      ]);
    })
    .then(() => {
      return knex('channels').insert([
        { name: 'channel1-inRoom1', room_id: 1 },
        { name: 'channel2-inRoom1', room_id: 1 },
        { name: 'channel3-inRoom1', room_id: 1 },
        { name: 'channel1-inRoom2', room_id: 2 },
        { name: 'channel2-inRoom2', room_id: 2 },
        { name: 'channel3-inRoom2', room_id: 2 },
        { name: 'channel1-inRoom3', room_id: 3 },
        { name: 'channel2-inRoom3', room_id: 3 },
        { name: 'channel3-inRoom3', room_id: 3 }
      ]);
    })
    .then(() => {
      return knex('roles').insert([
        { room_id: 1, user_id: 1, privilege_level: 'admin' },
        { room_id: 1, user_id: 2, privilege_level: 'moderator' },
        { room_id: 2, user_id: 1, privilege_level: 'moderator' },
        { room_id: 1, user_id: 3, privilege_level: 'guest' }
      ]);
    })
    .then(() => {
      return knex('messages').insert([
        { text: 'message1-inChannel1', user_id: 1, channel_id: 1 },
        { text: 'message2-inChannel1', user_id: 1, channel_id: 1 },
        { text: 'message3-inChannel1', user_id: 1, channel_id: 1 },
        { text: 'message2', user_id: 2, channel_id: 2 },
        { text: 'message1-fromUserId3', user_id: 3 },
        { text: 'message2-fromUserId3', user_id: 3 },
        { text: 'message2-fromUserId2', user_id: 2 }
      ]);
    })
    .then(() => {
      return knex('directs').insert([
        { to_user_id: 2, message_id: 5 },
        { to_user_id: 2, message_id: 6 },
        { to_user_id: 3, message_id: 7 }
      ]);
    });
  // return Promise.all(tableDeletes)
  //   .then(() => {
  //     return knex('profiles').insert([
  //       {
  //         id: 1,
  //         first: 'firstname1',
  //         last: 'lastname1',
  //         display: 'user1',
  //         phone: '',
  //         image: '',
  //         bio: ''
  //       },
  //       {
  //         id: 2,
  //         first: 'firstname2',
  //         last: 'lastname2',
  //         display: 'user2',
  //         phone: '',
  //         image: '',
  //         bio: ''
  //       },
  //       {
  //         id: 3,
  //         first: 'firstname3',
  //         last: 'lastname3',
  //         display: 'user3',
  //         phone: '',
  //         image: '',
  //         bio: ''
  //       }
  //     ]);
  //   })
  //   .then(() => {
  //     return knex('auths').insert([
  //       { id: 1, type: 'local', password: 'pass123', profile_id: 1 },
  //       { id: 2, type: 'local', password: 'pass123', profile_id: 2 },
  //       { id: 3, type: 'local', password: 'pass123', profile_id: 3 }
  //     ]);
  //   })
  //   .then(() => {
  //     return knex('friends').insert([
  //       { id: 1, user_id: 1, friend_id: 2 },
  //       { id: 2, user_id: 2, friend_id: 1 }
  //     ]);
  //   })
  //   .then(() => {
  //     return knex('rooms').insert([
  //       { id: 1, name: 'room1', description: 'description1' },
  //       { id: 2, name: 'room2', description: 'description2' },
  //       { id: 3, name: 'room3', description: 'description3' }
  //     ]);
  //   })
  //   .then(() => {
  //     return knex('channels').insert([
  //       { id: 1, name: 'channel1-inRoom1', room_id: 1 },
  //       { id: 2, name: 'channel2-inRoom1', room_id: 1 },
  //       { id: 3, name: 'channel3-inRoom1', room_id: 1 },
  //       { id: 4, name: 'channel1-inRoom2', room_id: 2 },
  //       { id: 5, name: 'channel2-inRoom2', room_id: 2 },
  //       { id: 6, name: 'channel3-inRoom2', room_id: 2 },
  //       { id: 7, name: 'channel1-inRoom3', room_id: 3 },
  //       { id: 8, name: 'channel2-inRoom3', room_id: 3 },
  //       { id: 9, name: 'channel3-inRoom3', room_id: 3 }
  //     ]);
  //   })
  //   .then(() => {
  //     return knex('roles').insert([
  //       { id: 1, room_id: 1, user_id: 1, privilege_level: 'admin' },
  //       { id: 2, room_id: 1, user_id: 2, privilege_level: 'moderator' },
  //       { id: 3, room_id: 2, user_id: 1, privilege_level: 'moderator' },
  //       { id: 4, room_id: 1, user_id: 3, privilege_level: 'guest' }
  //     ]);
  //   })
  //   .then(() => {
  //     return knex('messages').insert([
  //       { id: 1, text: 'message1-inChannel1', user_id: 1, channel_id: 1 },
  //       { id: 2, text: 'message2-inChannel1', user_id: 1, channel_id: 1 },
  //       { id: 3, text: 'message3-inChannel1', user_id: 1, channel_id: 1 },
  //       { id: 4, text: 'message2', user_id: 2, channel_id: 2 },
  //       { id: 5, text: 'message1-fromUserId3', user_id: 3 },
  //       { id: 6, text: 'message2-fromUserId3', user_id: 3 },
  //       { id: 7, text: 'message2-fromUserId2', user_id: 2 }
  //     ]);
  //   })
  //   .then(() => {
  //     return knex('directs').insert([
  //       { id: 1, to_user_id: 2, message_id: 5 },
  //       { id: 2, to_user_id: 2, message_id: 6 },
  //       { id: 3, to_user_id: 3, message_id: 7 }
  //     ]);
  //   });
};
