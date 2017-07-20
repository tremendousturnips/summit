const { Role, Profile } = require('../../db/models');

module.exports = {
  getUsersInRoom: (req, res) => {
    Role.where({ room_id: req.params.roomId })
      .fetchAll()
      .then(roles => {
        const profiles = roles.toJSON().map(role => Profile.where({ id: role.user_id }).fetch());
        return Promise.all(profiles);
      })
      .then(profiles => {
        res.status(200).send(profiles);
      })
      .catch(err => {
        res.status(503).send(`ERROR fetching profiles for room ${req.params.roomId}:`, err);
      });
  }
};
// module.exports = {
//   getUsersInRoom: (req, res) => {
//     Role.where({ room_id: req.params.roomId })
//       .fetchAll({ withRelated: ['user'] })
//       .then(roles => {
//         const profiles = roles.toJSON().map(role => role.user);
//         res.status(200).send(roles);
//       })
//       .catch(err => {
//         res.status(503).send(`ERROR fetching profiles for room ${req.params.roomId}:`, err);
//       });
//   }
// };
