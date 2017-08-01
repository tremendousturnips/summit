const { Channel, Direct, Message } = require('../../db/models');

module.exports = {
  getDirects: (req, res) => {
    Direct.forge()
      .query((qb) => {
        qb.where({to_user_id: req.params.id }).orWhere({ user_id: req.params.id }) 
      })
      .fetchAll({ withRelated: ['message'] })
      .then(messages => {
        res.status(200).send(messages.toJSON());
      })
      .catch(err => {
        console.log('err', err)
        res.status(503).send(err);
      });
  },

  create: (req, res) => {
    let outcome;
    Channel.forge({ name: req.params.id + ' ' + req.params.friendId })
      .save()
      .then(result => {
        console.log('In create new channel', result)
        outcome = result.toJSON().id
        return Direct.forge({ user_id: req.params.id, to_user_id: req.params.friendId, channel_id: outcome })
        .save()
      })
      .then(result => {
        console.log('New Message Channel inserted', result.toJSON())
        res.status(201).send(result.toJSON());
      })
      .catch(err => {
        if (err.constraint === 'Existing friend') {
          return res.status(403);
        }
        res.status(500).send(err);
      });
  }
};