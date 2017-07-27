const { Role, Profile } = require('../../db/models');

module.exports = {
  getUsersInRoom: (req, res) => {
    Role.where({ room_id: req.params.id })
      .fetchAll()
      .then(roles => {
        const profiles = roles.toJSON().map(role => Profile.where({ id: role.user_id }).fetch());
        return Promise.all(profiles);
      })
      .then(profiles => {
        res.status(200).send(profiles);
      })
      .catch(err => {
        res.status(503).send(`ERROR fetching profiles for room ${req.params.id}:`, err);
      });
  },

  saveRole: (req, res) => {
    const { room_id, user_id, privilege_level } = req.body;

    Role.forge({
      room_id: parseInt(room_id),
      user_id: parseInt(user_id),
      privilege_level
    })
      .save()
      .then(role => {
        res.status(200).json(role);
      })
      .catch(err => {
        console.log('ERROR saving message:', err);
        res.status(503).send(err);
      });
  }
};
// module.exports = {
//   getUsersInRoom: (req, res) => {
//     Role.where({ room_id: req.params.id })
//       .fetchAll({ withRelated: ['user'] })
//       .then(roles => {
//         const profiles = roles.toJSON().map(role => role.user);
//         res.status(200).send(roles);
//       })
//       .catch(err => {
//         res.status(503).send(`ERROR fetching profiles for room ${req.params.id}:`, err);
//       });
//   }
// };
