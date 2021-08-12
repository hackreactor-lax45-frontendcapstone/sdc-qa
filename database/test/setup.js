const schema = require('../setup/schema');
const ETL = require('../ETL');
const testConfig = require('../config/test.config');
const qanda_test = require('./index');

const EXTENSION = 'example_';

schema(qanda_test)
  .then(() => console.log('\n======== Populating ========'))
  .then(() => ETL.questions(testConfig, EXTENSION))
  .then(() => {
    const TABLE = 'questions';
    return qanda_test.raw(`SELECT MAX(id) FROM ${TABLE}`)
      .then((data) => data.rows[0].max)
      .then((max) => qanda_test.raw(`ALTER SEQUENCE ${TABLE}_id_seq RESTART WITH ${max + 1}`))
      .catch((error) => console.error(error));
  })
  .then(() => ETL.answers(testConfig, EXTENSION))
  .then(() => {
    const TABLE = 'answers';
    return qanda_test.raw(`SELECT MAX(id) FROM ${TABLE}`)
      .then((data) => data.rows[0].max)
      .then((max) => qanda_test.raw(`ALTER SEQUENCE ${TABLE}_id_seq RESTART WITH ${max + 1}`))
      .catch((error) => console.error(error));
  })
  .then(() => ETL.photos(testConfig, EXTENSION))
  .then(() => {
    const TABLE = 'photos';
    return qanda_test.raw(`SELECT MAX(id) FROM ${TABLE}`)
      .then((data) => data.rows[0].max)
      .then((max) => qanda_test.raw(`ALTER SEQUENCE ${TABLE}_id_seq RESTART WITH ${max + 1}`))
      .catch((error) => console.error(error));
  })
  .then(() => console.log('All data populated without error.'))
  .catch((error) => console.error(error))
  .finally(() => qanda_test.destroy(() => console.log('Connection closed.')));
