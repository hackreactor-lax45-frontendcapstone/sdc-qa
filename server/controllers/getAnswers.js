const { GET_ANSWERS } = require('../config/constants');
const db = require('../../database/index');

module.exports = (req, res) => {
  // console.log('\x1b[36m%s\x1b[0m', 'GET /qa/questions/:question_id/answers');

  const { question_id } = req.params;
  const { page, count } = req.query;
  const response = {
    question: question_id,
    page,
    count,
    results: [],
    aid: {},
  };

  db('answers').whereIn('question_id', [question_id]).select(GET_ANSWERS.ANSWER_SELECT)
    .then((answers) => {
      const answerIds = [];
      answers.forEach((answer) => {
        delete answer.question_id;
        response.aid[answer.answer_id] = answerIds.length;
        answerIds.push(answer.answer_id);
        response.results.push({ ...answer, photos: [] });
      });
      return answerIds;
    })
    .then((answerId) => db('photos').whereIn('answer_id', answerId).select(GET_ANSWERS.PHOTO_SELECT))
    .then((photos) => {
      photos.forEach((photo) => {
        const index = response.aid[photo.answer_id];
        delete photo.answer_id;
        response.results[index].photos.push(photo);
      });
      delete response.qid;
      delete response.aid;
      res.status(200).json(response);
    });
};
