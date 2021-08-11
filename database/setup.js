const schema = require('./setup/schema');
const ETL = require('./setup/ETL');

schema()
  .then(() => console.log('\n======== Populating ========'))
  .then(() => ETL.questions())
  .then(() => ETL.answers())
  .then(() => ETL.photos())
  .then(() => console.log('All data populated without error.'))
  .catch((error) => console.error(error));
