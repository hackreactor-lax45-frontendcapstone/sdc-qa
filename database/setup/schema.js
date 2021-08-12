module.exports = (client) => client.schema
  .dropTableIfExists('photos')
  .dropTableIfExists('answers')
  .dropTableIfExists('questions')
  .createTable('questions', (table) => {
    console.log('\n===== Schema Creation ======');
    console.log('Creating \'questions\' table.');
    table.increments('id');
    table.integer('product_id');
    table.string('body');
    table.float('date_written');
    table.string('asker_name');
    table.string('asker_email');
    table.boolean('reported');
    table.integer('helpful');
    table.index('product_id');
  })
  .createTable('answers', (table) => {
    console.log('Creating \'answers\' table.');
    table.increments('id');
    table.integer('question_id');
    table.foreign('question_id').references('questions.id');
    table.index('question_id');
    table.string('body');
    table.float('date_written');
    table.string('answerer_name');
    table.string('answerer_email');
    table.boolean('reported');
    table.integer('helpful');
  })
  .createTable('photos', (table) => {
    console.log('Creating \'photos\' table.');
    table.increments('id');
    table.integer('answer_id');
    table.foreign('answer_id').references('answers.id');
    table.index('answer_id');
    table.string('url');
  })
  .then(() => console.log('Successfully created database schemas.'))
  .catch((err) => console.error(err))
  .finally(() => client.destroy(() => console.log('Connection closed.')));
