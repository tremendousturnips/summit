const db = require('../');

const Friend = db.Model.extend({
  tableName: 'friends',
  user: function() {
    return this.belongsTo('Profile');
  },
  friend: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Friend', Friend);
