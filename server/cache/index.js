const memjs = require('memjs');

const cache = memjs.Client.create();

module.exports = {
  set: (key, value) => cache.set(key, value, { expires: 10 }),
  get: (key) => cache.get(key),
};
