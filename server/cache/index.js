const { SERVER } = require('../config/constants');
const memjs = require('memjs');

const cache = memjs.Client.create(SERVER.CACHES);

module.exports = {
  set: (key, value) => cache.set(key, value, { expires: 120 }),
  get: (key) => cache.get(key),
};
