exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.string('id').primary().notNullable();
    
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
