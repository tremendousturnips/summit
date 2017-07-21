const { Channel } = require('../../db/models');

module.exports = {
  getAll: (req, res) => {
    Channel.where({ room_id: req.params.id })
      .fetchAll()
      .then(channel => res.status(200).send(channel))
      .catch(err => {
        console.log('ERROR fetching channels for roomId', req.params.id, ':', err);
        res.status(503).send(err);
      });
  }
};
