const db = require('../');

const Friends = db.Model.extend({
  tableName: 'friends',
  user1: function() {
    return this.belongsToMany(db.Profile,'users_friends','user_id','id');
  },
  user2: function() {
    return this.belongsToMany('Profile','friends','id','friend_id');
  }
});

module.exports = db.model('Friends', Friends);


    
    // this.select(['friends.user_id', 'profiles1.display', 'profiles1.image', 
    //                               'friends.friend_id', 'profiles2.display', 'profiles2.image' ])
    //         .leftOuterJoin('profiles as profiles1', 'friends.user_id', 'profiles1.id')
    //         .leftOuterJoin('profiles as profiles2', 'friends.friend_id', 'profiles2.id')