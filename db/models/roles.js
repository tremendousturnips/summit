const db = require('../');

const Role = db.Model.extend({
  tableName: 'roles',
  room: function() {
    return this.belongsTo('Room');
  },
  user: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Role', Role);
