const { Role, Room } = require('../../db/models');

module.exports = {
  getAll: (req, res) => {
    Role.where({ user_id: req.params.id })
      .fetchAll({ withRelated: ['room'] })
      .then(roles => {
        const rooms = roles.toJSON().map(role => role.room);
        res.status(200).send(rooms);
      })
      .catch(err => {
        console.log('ERROR getting rooms:', err);
        res.status(503).send(err);
      });
  },
  saveRoom: (req, res) => {
    Room.forge(req.body).save()
      .then(room => res.status(201).send(room))
      .catch(err => res.status(503).send(err));
  },
  destroyRoom: (req, res) => {
    let toDestroy = {id: req.params.room_id};
    Room.forge(toDestroy).fetch()
      .then( room => {
        if (!room) {
          res.status(404).send({message: 'Resource not found. Could not destroy', room: toDestroy});
        } else {
          return room.destroy()
            .then(() => {
              res.status(200).send({message: 'Room destroyed', room: toDestroy});
            });
        }
      })
      .catch(err => res.status(503).send(err));
  }
  // getMessages: (req, res) => {
  //   const room_id = req.params.id;
  //   Channel.fetch({ room_id }).fetch({ withRelated: ['messages'] }).then(messages => {
  //     console.log('MESSAGES:', messages);
  //   });
  // }
};
