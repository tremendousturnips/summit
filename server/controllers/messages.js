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
    const { text, userId, channelId, toUserId } = req.body;
    Message.forge({
      text: text,
      user_id: parseInt(userId),
      channel_id: channelId ? parseInt(channelId) : null
    })
      .save()
      .then(message => {
        if (toUserId) {
          return Direct.forge({
            to_user_id: toUserId,
            message_id: message.id
          }).save();
        }
      })
      .then(() => {
        res.status(200).send('Message saved successfully');
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
