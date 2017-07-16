exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', t => {
      t.increments('id').unsigned().primary();
      t.string('first', 100).nullable();
      t.string('last', 100).nullable();
      t.string('display', 100).nullable();
      t.string('email', 100).nullable().unique();
      t.string('phone', 100).nullable();
      t.string('image').nullable();
      t.string('bio').nullable();
      t.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('auths', t => {
      t.increments('id').unsigned().primary();
      t.string('type', 8).notNullable();
      t.string('oauth_id', 30).nullable();
      t.string('password', 100).nullable();
      t.string('salt', 100).nullable();
      t.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('messages', t => {
      t.increments('id').primary();
      t.string('text').notNull();
      t.integer('user_id').references('id').inTable('profiles').notNull().onDelete('cascade');
      t.integer('channel_id').references('id').inTable('channels').nullable().onDelete('cascade');
      t.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('friends', t => {
      t.increments('id').primary();
      t.integer('user_id').references('id').inTable('profiles').notNull().onDelete('cascade');
      t.integer('friend_id').references('id').inTable('profiles').notNull().onDelete('cascade');
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
      t.integer('user_id').references('id').inTable('profiles').notNull().onDelete('cascade');
      t.string('privilege_level').notNull();
    }),
    knex.schema.createTableIfNotExists('directs', t => {
      t.increments('id').primary();
      t.integer('to_user_id').references('id').inTable('profiles').notNull().onDelete('cascade');
      t.integer('message_id').references('id').inTable('messages').notNull().onDelete('cascade');
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('friends'),
    knex.schema.dropTableIfExists('roles'),
    knex.schema.dropTableIfExists('directs'),
    knex.schema.dropTableIfExists('messages'),
    knex.schema.dropTableIfExists('channels'),
    knex.schema.dropTableIfExists('rooms'),
    knex.schema.dropTableIfExists('auths'),
    knex.schema.dropTableIfExists('profiles')
  ]);
};
