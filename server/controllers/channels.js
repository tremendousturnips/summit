const { Channel } = require('../../db/models');

module.exports = {
  getAll: (req, res) => {
    Channel.where({ room_id: req.params.id })
      .fetchAll()
      .then(channel => res.status(200).send(channel))
      .catch(err => {
        console.log('ERROR fetching channels for room_id', req.params.id, ':', err);
        res.status(503).send(err);
      });
  },
  saveChannel: (req, res) => {
    //TODO: forge and save channel;
    Channel.forge(req.body).save()
      .then((channel)=> {
        res.status(201).send(channel);
      });
  },
  destroyChannel: (req, res) => {
    //TODO forge and destroy channel;
    let toDestroy = {id: req.params.channel_id};
    Channel.forge(toDestroy).fetch()
      .then( channel => {
        if (!channel) {
          throw channel;
        }
        res.status(200).send(toDestroy);
        return channel.destroy();
      })
  }
};
