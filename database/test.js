const moment = require('moment');
const db = require('./index');

db('questions').select('date_written')
  .then((rows) => {
    rows.map((row) => console.log(moment(row.date_written).format('LLL')));
  })
  .finally(() => db.destroy());
