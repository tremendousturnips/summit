const { Message } = require('../../db/models');
const { Direct } = require('../../db/models');

module.exports = {
  getChannelMessages: (req, res) => {
    Message.where({ channel_id: req.params.channelId })
      .fetchAll()
      .then(room => res.status(200).send(room))
      .catch(err => {
        console.log('ERROR fetching messages for channelId', req.params.channelId, ':', err);
        res.status(503).send(err);
      });
  },

  saveMessage: (req, res) => {
    const { text, user_id, channel_id, toUserId } = req.body;
    Message.forge({
      text: text,
      user_id: parseInt(user_id),
      channel_id: channel_id ? parseInt(channel_id) : null
    })
      .save()
      .then(message => {
        if (toUserId) {
          Direct.forge({
            to_user_id: toUserId,
            message_id: message.id
          }).save();
        }
        res.status(200).json(message);
      })
      .catch(err => {
        console.log('ERROR saving message:', err);
        res.status(503).send(err);
      });
  },

  getDirectMessages: (req, res) => {
    const { userId, toUserId } = req.params;
    Direct.query({ where: { to_user_id: toUserId }, orWhere: { to_user_id: userId } } )
      .fetchAll({ withRelated: ['message'] })
      .then(directs => {
        const messages = directs.toJSON().map(direct => direct.message);
        res.status(200).send(messages);
      })
      .catch(err => {
        console.log('ERROR getting rooms:', err);
        res.status(503).send(err);
      });
  }
};
