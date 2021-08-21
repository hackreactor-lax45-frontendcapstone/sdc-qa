const memjs = require('memjs');

const cache = memjs.Client.create();

module.exports = {
  set: (key, value) => cache.set(key, value, { expires: 120 }),
  get: (key) => cache.get(key),
};
