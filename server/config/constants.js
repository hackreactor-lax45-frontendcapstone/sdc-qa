module.exports = {
  SERVER: {
    HOST: '0.0.0.0',
    PORT: 3000,
  },
  GET_QUESTIONS: {
    QUESTION_SELECT: {
      question_id: 'id',
      question_body: 'body',
      question_date: 'date_written',
      asker_name: 'asker_name',
      question_helpfulness: 'helpful',
      reported: 'reported',
    },
    ANSWER_SELECT: {
      id: 'id',
      question_id: 'question_id',
      body: 'body',
      date: 'date_written',
      answerer_name: 'answerer_name',
      helpfulness: 'helpful',
    },
    PHOTO_SELECT: {
      id: 'id',
      answer_id: 'answer_id',
      url: 'url',
    },
  },
  GET_ANSWERS: {
    ANSWER_SELECT: {
      answer_id: 'id',
      question_id: 'question_id',
      body: 'body',
      date: 'date_written',
      answerer_name: 'answerer_name',
      helpfulness: 'helpful',
    },
    PHOTO_SELECT: {
      id: 'id',
      answer_id: 'answer_id',
      url: 'url',
    },
  },
};
