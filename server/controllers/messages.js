const { Message } = require('../../db/models');

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
    const { text, userId, channelId } = req.body;
    // res.send(req.body.text);
    Message.forge({
      text: text,
      user_id: parseInt(userId),
      channel_id: parseInt(channelId)
    })
      .save(null, { method: 'insert' })
      .then(() => {
        res.status(200).send('Message saved successfully');
      });
  }
};
