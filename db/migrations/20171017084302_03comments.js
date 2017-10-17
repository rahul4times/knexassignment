
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', (table)=>{
    table.increments();
    table.string('content');
    table.integer('user_id').notNullable().references('id').inTable('users')
      .onDelete('CASCADE')
      .index();
      table.integer('post_id').notNullable().references('id').inTable('posts')
        .onDelete('CASCADE')
        .index();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
