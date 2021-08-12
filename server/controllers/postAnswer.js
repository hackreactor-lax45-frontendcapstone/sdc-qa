const { GET_ANSWERS } = require('../config/constants');
const db = require('../../database/test/index');

module.exports = (req, res) => {
  const { body } = req;
  const { question_id } = req.params;

  db('questions');

  res.sendStatus(201);
};
