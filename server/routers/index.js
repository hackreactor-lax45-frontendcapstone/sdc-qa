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
  .post('/questions', controllers.postQuestion)
  .post('/questions/:question_id/answers', controllers.postAnswer);

router
  .put('/questions/:question_id/helpful', controllers.helpfulQuestion)
  .put('/questions/:question_id/report', controllers.reportQuestion);

router
  .put('/answers/:answer_id/helpful', controllers.helpfulAnswer)
  .put('/answers/:answer_id/report', controllers.reportAnswer);

router
  .get('/photos', controllers.getOnlyPhotos)
  .get('/answers', controllers.getOnlyAnswers);

module.exports = router;
