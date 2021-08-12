const schema = require('./schema');
const ETL = require('../ETL');
const config = require('../config/config');
const qanda = require('../index');

const EXTENSION = '';

schema(qanda)
  .then(() => console.log('\n======== Populating ========'))
  .then(() => ETL.questions(config, EXTENSION))
  .then(() => ETL.answers(config, EXTENSION))
  .then(() => ETL.photos(config, EXTENSION))
  .then(() => console.log('All data populated without error.'))
  .catch((error) => console.error(error));
