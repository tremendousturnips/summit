const { Room, Role } = require('../../db/models');

module.exports = {
  getAll: (req, res) => {
    Role.where({ user_id: req.params.userId })
      .fetchAll({ withRelated: ['room'] })
      .then(roles => {
        const rooms = roles.toJSON().map(role => role.room);
        res.status(200).send(rooms);
      })
      .catch(err => {
        console.log('ERROR getting rooms:', err);
        res.status(503).send(err);
      });
  }
  // getMessages: (req, res) => {
  //   const room_id = req.params.roomId;
  //   Channel.fetch({ room_id }).fetch({ withRelated: ['messages'] }).then(messages => {
  //     console.log('MESSAGES:', messages);
  //   });
  // }
};
