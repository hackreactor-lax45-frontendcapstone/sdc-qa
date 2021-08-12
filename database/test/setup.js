const schema = require('../setup/schema');
const ETL = require('../ETL');
const testConfig = require('../config/test.config');
const qanda_test = require('./index');

const EXTENSION = 'example_';

schema(qanda_test)
  .then(() => console.log('\n======== Populating ========'))
  .then(() => ETL.questions(testConfig, EXTENSION))
  .then(() => ETL.answers(testConfig, EXTENSION))
  .then(() => ETL.photos(testConfig, EXTENSION))
  .then(() => console.log('All data populated without error.'))
  .catch((error) => console.error(error));
