const CONSTANTS = require('../config/constants');
const db = require('../../database/index');

module.exports = (req, res) => {
  const { product_id } = req.query;
  const response = {
    product_id,
    results: [],
    qid: {},
    aid: {},
  };
  let now = new Date();
  db('questions').where({ product_id }).select(CONSTANTS.QUESTION_SELECT)
    .then((questions) => {
      console.log('elapsed for questions query: ', new Date() - now);
      const questionIds = [];
      questions.forEach((question) => {
        response.results.push({ ...question, answers: {} });
        response.qid[question.question_id] = questionIds.length;
        questionIds.push(question.question_id);
      });
      now = new Date();
      return questionIds;
    })
    .then((questionId) => db('answers').whereIn('question_id', questionId).select(CONSTANTS.ANSWER_SELECT))
    .then((answers) => {
      console.log('elapsed for answers: ', new Date() - now);
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
    .then((answerId) => db('photos').whereIn('answer_id', answerId).select(CONSTANTS.PHOTO_SELECT))
    .then((photos) => {
      console.log('elapsed for photos: ', new Date() - now);
      photos.forEach((photo) => {
        const index = response.aid[photo.answer_id];
        response.results[index].answers[photo.answer_id] = photo;
        delete photo.answer_id;
      });
      delete response.qid;
      delete response.aid;
      res.status(200).json(response);
    })
    .catch((err) => res.status(404).send(err));
};
