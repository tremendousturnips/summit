const db = require('../');

const Message = db.Model.extend({
  tableName: 'messages',
  user: function() {
    return this.belongsTo('Profile');
  },
  channel: function() {
    return this.belongsTo('Channel');
  },
  direct: function() {
    return this.belongsToMany('Direct', 'messages', 'channel_id', 'channel_id').through('Channel', 'id', '');
  }
});

module.exports = db.model('Message', Message);
