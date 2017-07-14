exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', t => {
      t.increments('id').primary();
      t.dateTime('join_date').notNull();
      t.string('name').notNull();
      t.string('image').nullable();
      t.string('bio').nullable();
    }),
    knex.schema.createTableIfNotExists('messages', t => {
      t.increments('id').primary();
      t.string('text').notNull();
      t.integer('user_id').references('id').inTable('users').notNull().onDelete('cascade');
      t.integer('room_id').references('id').inTable('rooms').notNull().onDelete('cascade');
      t.integer('channel_id').references('id').inTable('channels').notNull().onDelete('cascade');
      t.dateTime('created_at').notNull();
    }),
    knex.schema.createTableIfNotExists('friends', t => {
      t.increments('id').primary();
      t.integer('user_id').references('id').inTable('users').notNull().onDelete('cascade');
      t.integer('friend_id').references('id').inTable('users').notNull().onDelete('cascade');
    }),
    knex.schema.createTableIfNotExists('rooms', t => {
      t.increments('id').primary();
      t.string('name').notNull();
      t.string('description').nullable();
    }),
    knex.schema.createTableIfNotExists('channels', t => {
      t.increments('id').primary();
      t.string('name').notNull();
      t.integer('room_id').references('id').inTable('rooms').notNull().onDelete('cascade');
    }),
    knex.schema.createTableIfNotExists('roles', t => {
      t.increments('id').primary();
      t.integer('room_id').references('id').inTable('rooms').notNull().onDelete('cascade');
      t.integer('user_id').references('id').inTable('users').notNull().onDelete('cascade');
      t.string('privilege_level').notNull();
    }),
    knex.schema.createTableIfNotExists('directs', t => {
      t.increments('id').primary();
      t.integer('user1_id').references('id').inTable('users').notNull().onDelete('cascade');
      t.integer('user2_id').references('id').inTable('users').notNull().onDelete('cascade');
      t.integer('message_id').references('id').inTable('messages').notNull().onDelete('cascade');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('friends'),
    knex.schema.dropTable('roles'),
    knex.schema.dropTable('directs'),
    knex.schema.dropTable('messages'),
    knex.schema.dropTable('channels'),
    knex.schema.dropTable('rooms'),
    knex.schema.dropTable('users')
  ]);
};
