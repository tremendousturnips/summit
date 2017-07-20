exports.up = (knex, Promise) => {

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
