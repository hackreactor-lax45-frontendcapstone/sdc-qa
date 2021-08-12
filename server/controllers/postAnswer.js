const { GET_ANSWERS } = require('../config/constants');
const db = require('../../database/index');

module.exports = (req, res) => {
  const { body } = req;
  const { question_id } = req.params;
  res.status(201).json({ ...body, question_id });
};
