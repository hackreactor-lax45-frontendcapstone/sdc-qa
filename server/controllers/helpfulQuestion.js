const db = require('../../database/test/index');

module.exports = (req, res) => {
  const { question_id } = req.params;

  db('questions').where({ id: question_id })
    .increment({ helpful: 1 })
    .then(() => res.sendStatus(204))
    .catch((error) => res.status(404).send(error));
};
