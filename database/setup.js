const schema = require('./setup/schema');
const ETL = require('./setup/ETL');

schema()
  .then(() => {
    console.log('\n======== Populating ========');
    ETL('questions');
    ETL('answers');
    ETL('photos');
  })
  .catch((error) => console.error(error));
