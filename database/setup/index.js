const schema = require('./schema');
const ETL = require('../ETL');
const config = require('../config/config');
const qanda = require('../index');

const EXTENSION = '';

schema(qanda)
  .then(() => console.log('\n======== Populating ========'))
  .then(() => ETL.questions(config, EXTENSION))
  .then(() => {
    const TABLE = 'questions';
    return qanda.raw(`SELECT MAX(id) FROM ${TABLE}`)
      .then((data) => data.rows[0].max)
      .then((max) => qanda.raw(`ALTER SEQUENCE ${TABLE}_id_seq RESTART WITH ${max + 1}`))
      .catch((error) => console.error(error));
  })
  .then(() => ETL.answers(config, EXTENSION))
  .then(() => {
    const TABLE = 'answers';
    return qanda.raw(`SELECT MAX(id) FROM ${TABLE}`)
      .then((data) => data.rows[0].max)
      .then((max) => qanda.raw(`ALTER SEQUENCE ${TABLE}_id_seq RESTART WITH ${max + 1}`))
      .catch((error) => console.error(error));
  })
  .then(() => ETL.photos(config, EXTENSION))
  .then(() => {
    const TABLE = 'photos';
    return qanda.raw(`SELECT MAX(id) FROM ${TABLE}`)
      .then((data) => data.rows[0].max)
      .then((max) => qanda.raw(`ALTER SEQUENCE ${TABLE}_id_seq RESTART WITH ${max + 1}`))
      .catch((error) => console.error(error));
  })
  .then(() => console.log('All data populated without error.'))
  .catch((error) => console.error(error))
  .finally(() => qanda.destroy(() => console.log('Connection closed.')));
