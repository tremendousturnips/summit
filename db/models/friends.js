const db = require('../');

const Friend = db.Model.extend({
  tableName: 'friends',
  user1: function() {
    return this.belongsTo('User');
  },
  user2: function() {
    return this.belongsTo('User');
  }
});

module.exports = db.model('Friend', Friend);
