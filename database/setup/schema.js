const knex = require('knex');
const config = require('../config/config');

const postgres = knex({
  client: 'pg',
  connection: config,
  pool: { min: 2, max: 10 },
});

module.exports = () => postgres.schema
  .dropTableIfExists('photos')
  .dropTableIfExists('answers')
  .dropTableIfExists('questions')
  .createTable('questions', (table) => {
    console.log('\n===== Schema Creation ======');
    console.log('Creating \'questions\' table.');
    table.increments('id');
    table.integer('product_id');
    table.string('body');
    table.string('date_written');
    table.string('asker_name');
    table.string('asker_email');
    table.boolean('reported');
    table.integer('helpful');
  })
  .createTable('answers', (table) => {
    console.log('Creating \'answers\' table.');
    table.increments('id');
    table.integer('question_id');
    table.string('body');
    table.string('date_written');
    table.string('answerer_name');
    table.string('answerer_email');
    table.boolean('reported');
    table.integer('helpful');
  })
  .createTable('photos', (table) => {
    console.log('Creating \'photos\' table.');
    table.increments('id');
    table.integer('answer_id');
    table.string('url');
  })
  .then(() => console.log('Successfully created database schemas.'))
  .catch((err) => console.error(err))
  .finally(() => postgres.destroy(() => console.log('Connection closed.')));
