const db = require('../');

const Direct = db.Model.extend({
  tableName: 'directs',
  message: function() {
    return this.hasMany('Message', 'directs', 'channel_id', 'channel_id').through('Channel', 'channel_id', 'id');
  },
  channel: function() {
    return this.belongsToMany('Channel', 'directs', 'channel_id','id')
  },
  user: function() {
    return this.belongsToMany('Profiles');
  }
});

module.exports = db.model('Direct', Direct);
