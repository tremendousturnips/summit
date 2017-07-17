const db = require('../');

const Message = db.Model.extend({
  tableName: 'messages',
  user: function() {
    return this.belongsTo('Profile');
  },
  channel: function() {
    return this.belongsTo('Channel');
  }
});

module.exports = db.model('Message', Message);
