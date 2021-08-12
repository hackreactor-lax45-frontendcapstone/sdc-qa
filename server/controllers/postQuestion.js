const { GET_ANSWERS } = require('../config/constants');
const db = require('../../database/index');

module.exports = (req, res) => {
  res.status(201).json(req.body);
};
