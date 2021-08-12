const express = require('express');
const controllers = require('../controllers/index');

const router = express.Router();

/*
    /qa
*/
router
  .get('/questions', controllers.getQuestions)
  .get('/questions/:question_id/answers', controllers.getAnswers);

router
  .post('/questions', controllers.else)
  .post('/questions/:question_id/answers', controllers.else);

router
  .put('/questions/:question_id/helpful', controllers.else)
  .put('/questions/:question_id/report', controllers.else);

router
  .put('/answers/:answer_id/helpful', controllers.else)
  .put('/answers/:answer_id/report', controllers.else);

module.exports = router;
