const db = require('../');

const Direct = db.Model.extend({
  tableName: 'directs',
  toUser: function() {
    return this.belongsTo('User');
  },
  message: function() {
    return this.belongsTo('Message');
  }
});

module.exports = db.model('Direct', Direct);
