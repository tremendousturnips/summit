const { Channel } = require('../../db/models');

module.exports = {
  getAll: (req, res) => {
    Channel.where({ room_id: req.params.id })
      .fetchAll()
      .then(channel => {
        res.status(200).send(channel);
      })
      .catch(err => {
        console.log('ERROR fetching channels for room_id', req.params.id, ':', err);
        res.status(503).send(err);
      });
  },
  saveChannel: (req, res) => {
    Channel.forge(req.body).save()
      .then(channel => res.status(201).send(channel))
      .catch(err => res.status(503).send(err));
  },
  destroyChannel: (req, res) => {
    let toDestroy = {id: req.params.channel_id};
    Channel.forge(toDestroy).fetch()
      .then( channel => {
        if (!channel) {
          res.status(404).send({message: 'Resource not found. Could not destroy', channel: toDestroy});
        } else {
          return channel.destroy()
            .then(() => {
              res.status(200).send({message: 'Channel destroyed', channel: toDestroy});
            });
        }
      })
      .catch(err => res.status(503).send(err));
  }
};
