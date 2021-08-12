const getQuestions = require('./getQuestions');

module.exports = {
  getQuestions,
  else: (req, res) => res.sendStatus(200),
};
