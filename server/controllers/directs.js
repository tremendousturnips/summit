const { Channel, Direct, Message } = require('../../db/models');

module.exports = {
  getDirects: (req, res) => {
    Direct.forge()
      .query((qb) => {
        qb.where({to_user_id: req.params.id }).orWhere({ user_id: req.params.id }) 
      })
      .fetchAll({ withRelated: ['message'] })
      .then(messages => {
        const m = messages.toJSON();
        console.log('In directs controller before swap', m)
        for (var key in m) {
          if (m[key].to_user_id === req.params.id) {
            m[key].to_user_id = m[key].user_id
            m[key].user_id = req.params.id
          }
        }
        console.log('In directs controller after swap', m)
        res.status(200).send(m);
      })
      .catch(err => {
        console.log('err', err)
        res.status(503).send(err);
      });
  },

  create: (req, res) => {
    let outcome;
    Direct.forge()
    .query((qb) => {
      qb.where({to_user_id: req.params.id, user_id: req.params.friendId }).orWhere({ user_id: req.params.id, to_user_id: req.params.friendId }) 
    })
    .fetchAll()
    .then((channel) => {
      console.log('Direct channel', channel.toJSON())
      if (channel.length > 0) {
        res.status(201).send(channel.toJSON());
      } else {
        console.log('Direct channel not found')
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
      }
    })
    .catch(err => {
      if (err.constraint === 'Existing friend') {
        return res.status(403);
      } else {
        console.log('Err creating new direct message', err)
      }
      res.status(500).send(err);
    });
  }
};