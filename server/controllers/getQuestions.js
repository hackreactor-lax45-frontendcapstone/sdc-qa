const { RAW_SQL, SERVER } = require('../config/constants');
const db = require('../../database/index');

module.exports = (req, res) => {
  const { product_id } = req.query;
  db.raw(RAW_SQL.GET_QUESTIONS(product_id))
    .then((results) => {
      res.status(200).json(results.rows[0]);
    })
    .catch((error) => console.error(error));
};
