const getQuestions = require('./getQuestions');
const getAnswers = require('./getAnswers');

module.exports = {
  getQuestions,
  getAnswers,
  else: (req, res) => res.sendStatus(200),
};
