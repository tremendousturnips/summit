const { Friends, Profile } = require('../../db/models');

module.exports = {
  getAll: (req, res) => {
    Friends.forge()
      .query((qb) => {
        qb.where('user_id', req.params.id);
      })
      .fetchAll({withRelated: ['user2']})
      .then(friends => {
        if (friends.toJSON())  {
          friends = friends.toJSON()
          friends = friends.map(friend => {
            console.log('friend',friend.user2)
            if (friend.user2.length > 0) {
              friend.first = friend.user2[0].first
              friend.image = friend.user2[0].image
              delete friend.user2
            }
            return friend
          })  
        }
        console.log(friends)
        res.status(200).send(friends);
      })
      .catch(err => {
        console.log('err', err)
        res.status(503).send(err);
      });
  },

  create: (req, res) => {
    Friends.forge({ user_id: req.params.id, friend_id: req.params.friendId })
      .save()
      .then(result => {
        res.status(201).send(result);
      })
      .catch(err => {
        if (err.constraint === 'Existing friend') {
          return res.status(403);
        }
        res.status(500).send(err);
      });
  },

  deleteOne: (req, res) => {
    console.log('In friends deleteOne', req.params.id, req.params.friendId);
    Friends.where({ user_id: req.params.id, friend_id: req.params.friendId }).fetch()
      .then(friend => {
        if (!friend) {
          throw friend;
        }
        return friend.destroy();
      })
      .then(() => {
        res.sendStatus(200);
      })
      .error(err => {
        res.status(503).send(err);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  }
};