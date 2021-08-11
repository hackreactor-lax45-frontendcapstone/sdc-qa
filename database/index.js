const knex = require('knex');
const config = require('./config/config');

module.exports = knex({
  client: 'pg',
  connection: config,
  pool: { min: 2, max: 10 },
});
