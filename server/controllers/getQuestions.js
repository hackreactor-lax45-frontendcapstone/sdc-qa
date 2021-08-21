const { RAW_SQL, SERVER } = require('../config/constants');
const db = require('../../database/index');
const Cache = require('../cache')

module.exports = (req, res) => {
  const { product_id } = req.query;
  Cache.get(product_id)
    .then((response) => {
      const { value } = response;
      if (value !== null) {
        res.status(200).send(JSON.parse(value));
      } else {
        db.raw(RAW_SQL.GET_QUESTIONS(product_id))
          .then((results) => {
            const data = results.rows[0];
            Cache.set(product_id, JSON.stringify(data));
            res.status(200).json(data);
          })
          .catch((error) => {
            res.status(404).send(error);
          });
      }
    })
    .catch((error) => {
      res.status(404).send(error);
    });
};
