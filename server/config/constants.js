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
  RAW_SQL: {
    GET_QUESTIONS: (product) => `select
      ${product} as product_id,
      (select
        json_agg(results) as results
      from (
        select
          questions.id as question_id,
          questions.body as question_body,
          questions.date_written as question_date,
          questions.asker_name,
          questions.helpful as question_helpfulness,
          questions.reported,
          (
            select
              json_agg(answers)
            from (
              select
                answers.id,
                answers.body,
                answers.date_written as date,
                answers.answerer_name,
                answers.helpful as helpfulness,
                (
                  select
                    json_agg(photos)
                  from (
                    select
                      photos.id,
                      photos.url
                    from
                      photos
                    where
                      photos.answer_id = answers.id
                  ) as photos
                ) as photos
              from
                answers
              where
                answers.question_id = questions.id
            ) as answers
          ) as answers
        from
          questions
        where
          questions.product_id = ${product}
      ) as results) as results;`,
    GET_ANSWERS: (question) => `select
      questions.id as question,
      (
        select
          json_agg(answers)
        from (
          select
            answers.id as answer_id,
            answers.body,
            answers.date_written as date,
            answers.answerer_name,
            answers.helpful as helpfulness,
            (
              select
                json_agg(photos)
              from (
                select
                  photos.id,
                  photos.url
                from
                  photos
                where
                  photos.answer_id = answers.id
              ) as photos
            ) as photos
          from
            answers
          where
            answers.question_id = ${question}
        ) as answers
      ) as results
    from
      questions
    where
      questions.id = ${question};`,
  },
};
