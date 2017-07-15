const db = require('../');

const Room = db.Model.extend({
  tableName: 'rooms',
  channels: function() {
    return this.hasMany('Channel');
  }
});

module.exports = db.model('Room', Room);
