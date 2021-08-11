const schema = require('./schema');
const ETL = require('./ETL');
const db = require('../index');

const EXTENSION = 'example_';

schema()
  .then(() => console.log('\n======== Populating ========'))
  .then(() => ETL.questions(EXTENSION))
  .then(() => ETL.answers(EXTENSION))
  .then(() => ETL.photos(EXTENSION))
  .then(() => console.log('All data populated without error.'))
  .catch((error) => console.error(error));
