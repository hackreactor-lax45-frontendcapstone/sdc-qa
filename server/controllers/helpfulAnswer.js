const db = require('../../database/test/index');

module.exports = (req, res) => {
  const { answer_id } = req.params;

  db('answers').where({ id: answer_id })
    .increment({ helpful: 1 })
    .then(() => res.sendStatus(204))
    .catch((error) => res.status(404).send(error));
};
