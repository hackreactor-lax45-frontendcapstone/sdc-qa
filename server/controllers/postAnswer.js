const db = require('../../database/index');

module.exports = (req, res) => {
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

  db('answers').insert(answer)
    .then(() => res.sendStatus(201))
    .catch((error) => res.status(404).send(error));

  db('photos').insert(photos);
};
