const db = require('../');

const Room = db.Model.extend({
  tableName: 'rooms',
  channels: function() {
    return this.hasMany('Channel');
  },
  roles: function() {
    return this.hasMany('Role');
  }
});

module.exports = db.model('Room', Room);
