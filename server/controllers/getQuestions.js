const { GET_QUESTIONS } = require('../config/constants');
const db = require('../../database/index');

module.exports = (req, res) => {
  console.log('\x1b[36m%s\x1b[0m', 'GET /qa/questions');

  const { product_id } = req.query;
  const response = {
    product_id,
    results: [],
    qid: {},
    aid: {},
  };
  db('questions').where({ product_id }).select(GET_QUESTIONS.QUESTION_SELECT)
    .then((questions) => {
      const questionIds = [];
      questions.forEach((question) => {
        response.results.push({ ...question, answers: {} });
        response.qid[question.question_id] = questionIds.length;
        questionIds.push(question.question_id);
      });
      return questionIds;
    })
    .then((questionId) => db('answers').whereIn('question_id', questionId).select(GET_QUESTIONS.ANSWER_SELECT))
    .then((answers) => {
      const answerIds = [];
      answers.forEach((answer) => {
        answerIds.push(answer.id);
        const index = response.qid[answer.question_id];
        delete answer.question_id;
        response.aid[answer.id] = index;
        response.results[index].answers[answer.id] = { ...answer, photos: [] };
      });
      return answerIds;
    })
    .then((answerId) => db('photos').whereIn('answer_id', answerId).select(GET_QUESTIONS.PHOTO_SELECT))
    .then((photos) => {
      photos.forEach((photo) => {
        const index = response.aid[photo.answer_id];
        response.results[index].answers[photo.answer_id].photos.push(photo);
        delete photo.answer_id;
      });
      delete response.qid;
      delete response.aid;
      res.status(200).json(response);
    })
    .catch((err) => res.status(404).send(err));
};
