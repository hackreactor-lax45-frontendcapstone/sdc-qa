const { RAW_SQL } = require('../config/constants');
const db = require('../../database/index');

module.exports = (req, res) => {
  const { question_id } = req.params;
  db.raw(RAW_SQL.GET_ANSWERS(question_id))
    .then((results) => {
      res.status(200).json(results.rows[0]);
    })
    .catch((error) => console.error(error));
};
