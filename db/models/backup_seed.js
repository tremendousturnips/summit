
// exports.seed = function(knex, Promise) {
//   const tableDeletes = tables.map(tablename => knex(tablename).del());
//   let auth, room, channel;
//   return Promise.all(tableDeletes).then(
//     Promise.all([
//       models.Profile
//         .where({ email: 'admin@domain.com' })
//         .fetch()
//         .then(profile => {
//           if (profile) {
//             throw profile;
//           }
//           return models.Profile
//             .forge({
//               // id: 1,
//               first: 'System',
//               last: 'Admin',
//               display: 'Administrator',
//               email: 'admin@domain.com'
//             })
//             .save();
//         })
//         .error(err => {
//           console.error('ERROR: failed to create profile');
//           throw err;
//         })
//         .then(profile => {
//           return models.Auth
//             .forge({
//               // id: 1,
//               type: 'local',
//               password: 'admin123',
//               profile_id: profile.get('id')
//             })
//             .save();
//         })
//         // .then(newAuth => {
//         //   auth = newAuth;
//         // })
//         .error(err => {
//           console.error('ERROR: failed to create auth');
//         })
//         .catch(() => {
//           console.log('WARNING: default user already exists.');
//         }) //,
//       // models.Room
//       //   .forge({id: 1, name: 'Some Room', description: 'A room for hanging out in' })
//       //   .save()
//       //   .error(err => console.log(err))
//       //   .then(newRoom => {
//       //     room = newRoom;
//       //     return models.Channel
//       //       .forge({
//       //         id: 1,
//       //         name: 'channel1',
//       //         room_id: 1//newRoom.get('id')
//       //       })
//       //       .save();
//       //   })
//       // .then(newChannel => {
//       //   channel = newChannel;
//       // }),
//       // models.Message
//       //   .forge({ text: 'This is a message', user_id: auth.profile_id, room_id: room.id,  })

//       // models.Message

//       // models.Direct

//       // models.Role
//     ])
//   );
// };
