const knex = require('knex');
const config = require('./config.json');

const postgres = knex({
  client: 'pg',
  connection: config,
  pool: { min: 2, max: 10 },
});

postgres.schema
  .dropTableIfExists('answers')
  .dropTableIfExists('photos')
  .dropTableIfExists('questions')
  .createTable('questions', (table) => {
    table.increments('id');
    table.string('body');
    table.datetime('date_written');
    table.string('name');
    table.boolean('reported');
    table.integer('helpful');
  })
  .createTable('answers', (table) => {
    table.increments('id');
    table
      .integer('question_id')
      .references('questions.id');
    table.string('body');
    table.datetime('date_written');
    table.string('answerer_name');
    table.string('email');
    table.boolean('reported');
    table.integer('helpful');
  })
  .createTable('photos', (table) => {
    table.increments('id');
    table
      .integer('answer_id')
      .references('answers.id');
    table.string('url');
  })
  .catch((err) => console.error(err))
  .finally(() => {
    postgres.destroy(() => console.log('Connection closed.'));
  });
