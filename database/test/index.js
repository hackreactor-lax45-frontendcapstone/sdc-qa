const knex = require('knex');
const testConfig = require('../config/test.config');

module.exports = knex({
  client: 'pg',
  connection: testConfig,
  pool: { min: 2, max: 10 },
});
