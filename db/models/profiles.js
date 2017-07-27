const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  messages: function() {
    return this.hasMany('Message');
  },
  roles: function() {
    return this.hasMany('Role');
  },
  friends: function() {
    return this.belongsToMany('Friends','user2','friend_id', 'id')
  }
});

module.exports = db.model('Profile', Profile);
