const db = require('../../database/index');

module.exports = (req, res) => {
  console.log('\x1b[36m%s\x1b[0m', 'POST /qa/questions/:question_id/answers');

  const { question_id } = req.params;

  const {
    body,
    name,
    email,
    photos,
  } = req.body;

  const answer = {
    question_id,
    body,
    date_written: Date.now(),
    answerer_name: name,
    answerer_email: email,
    reported: false,
    helpful: 0,
  };

  db('answers').insert(answer, 'id')
    .then((answer_id) => photos.map((photo, i) => ({
      answer_id: answer_id[0],
      url: photos[i],
    })))
    .then((photoObj) => {
      db('photos').insert(photoObj)
        .then(() => res.sendStatus(201))
        .catch((error) => console.error(error));
    })
    .catch((error) => res.status(404).send(error));
};
