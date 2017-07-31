const db = require('../');

const Channel = db.Model.extend({
  tableName: 'channels',
  messages: function() {
    return this.hasMany('Message');
  },
  room: function() {
    return this.belongsTo('Room');
  },
  directs: function() {
    return this.hasMany('Directs');
  }
});

module.exports = db.model('Channel', Channel);
