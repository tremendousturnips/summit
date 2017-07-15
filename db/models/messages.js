const db = require('../');

const Message = db.Model.extend({
  tableName: 'messages',
  user: function() {
    return this.belongsTo('Profile');
  },
  room: function() {
    return this.belongsTo('Room');
  },
  channel: function() {
    return this.belongsTo('Channel');
  }
});

module.exports = db.model('Message', Message);
