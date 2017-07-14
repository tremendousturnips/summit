exports.up = function(knex, Promise) {
  return Promise.all[
    (
      knex.schema.createTable('users', t => {
        t.increments('id').primary();
        t.dateTime('join_date').notNull();
        t.string('name').notNull();
        t.string('image').nullable();
        t.string('bio').nullable();
      }),
      knex.schema.createTable('messages', t => {
        t.increments('id').primary();
        t.string('text').notNull();
        t.integer('user_id').references('id').inTable('users').notNull().onDelete('cascade');
        // room_id
        t.integer('room_id').references('id').inTable('rooms').notNull().onDelete('cascade');
        // channel_id
        t.integer('channel_id').references('id').inTable('channels').notNull().onDelete('cascade');
        // created_at
        t.dateTime('created_at').notNull();
      }),
      knex.schema.createTable('friends', t => {
        t.increments('id').primary();
        //user_id
        t.integer('user_id').references('id').inTable('users').notNull().onDelete('cascade');
        //friend_id
        t.integer('friend_id').references('id').inTable('users').notNull().onDelete('cascade');
      }),
      knex.schema.createTable('rooms', t => {
        t.increments('id').primary();
        //name
        t.string('name').notNull();
        //description
        t.string('description').nullable();
      }),
      knex.schema.createTable('channels', t => {
        t.increments('id').primary();
        //name
        t.string('name').notNull();
        //room_id
        t.integer('room_id').references('id').inTable('rooms').notNull().onDelete('cascade');
      }),
      knex.schema.createTable('roles', t => {
        t.increments('id').primary();
        //room_id
        t.integer('room_id').references('id').inTable('rooms').notNull().onDelete('cascade');
        //user_id
        t.integer('user_id').references('id').inTable('users').notNull().onDelete('cascade');
        //priveleage_level
        t.string('privilege_level').notNull();
      }),
      knex.schema.createTable('directs', t => {
        t.increments('id').primary();
        //user1_id
        t.integer('user1_id').references('id').inTable('users').notNull().onDelete('cascade');
        //user2_id
        t.integer('user2_id').references('id').inTable('users').notNull().onDelete('cascade');
        //message_id
        t.integer('message_id').references('id').inTable('messages').notNull().onDelete('cascade');
      })
    )
  ];
};
// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('users', (t) => {
//     t.increments('id').primary();
//     t.dateTime('joinDate').notNull();
//     t.string('name').notNull();
//     t.string('image');
//     t.string('bio');
//   });
// };

exports.down = function(knex, Promise) {};
