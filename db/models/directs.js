const db = require('../');

const Direct = db.Model.extend({
  tableName: 'direts',
  user1: function() {
    return this.belongsTo('User');
  },
  user2: function() {
    return this.belongsTo('User');
  },
  message: function() {
    return this.belongsTo('Message');
  }
});

module.exports = db.model('Direct', Direct);
