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
  const tableDeletes = tables.map(tablename => knex(tablename).del());
  return Promise.all(tableDeletes)
    .then(() => {
      return knex('profiles').insert([
        {
          id: 1,
          first: 'firstname1',
          last: 'lastname1',
          display: 'user1',
          phone: '',
          image: '',
          bio: ''
        },
        {
          id: 2,
          first: 'firstname2',
          last: 'lastname2',
          display: 'user2',
          phone: '',
          image: '',
          bio: ''
        },
        {
          id: 3,
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
        { id: 1, type: 'local', password: 'pass123', profile_id: 1 },
        { id: 2, type: 'local', password: 'pass123', profile_id: 2 },
        { id: 3, type: 'local', password: 'pass123', profile_id: 3 }
      ]);
    })
    .then(() => {
      return knex('friends').insert([
        { id: 1, user_id: 1, friend_id: 2 },
        { id: 2, user_id: 2, friend_id: 1 }
      ]);
    })
    .then(() => {
      return knex('rooms').insert([
        { id: 1, name: 'room1', description: 'description1' },
        { id: 2, name: 'room2', description: 'description2' },
        { id: 3, name: 'room3', description: 'description3' }
      ]);
    })
    .then(() => {
      return knex('channels').insert([
        { id: 1, name: 'channel1', room_id: 1 },
        { id: 2, name: 'channel2', room_id: 2 },
        { id: 3, name: 'channel3', room_id: 3 }
      ]);
    })
    .then(() => {
      return knex('roles').insert([
        { id: 1, room_id: 1, user_id: 1, privilege_level: 'admin' },
        { id: 2, room_id: 1, user_id: 2, privilege_level: 'moderator' },
        { id: 3, room_id: 1, user_id: 3, privilege_level: 'guest' }
      ]);
    })
    .then(() => {
      return knex('messages').insert([
        { id: 1, text: 'message1', user_id: 1, channel_id: 1 },
        { id: 2, text: 'message2', user_id: 2, channel_id: 2 },
        { id: 3, text: 'message3', user_id: 3 }
      ]);
    })
    .then(() => {
      return knex('directs').insert([{ id: 3, to_user_id: 2, message_id: 3 }]);
    });
};
