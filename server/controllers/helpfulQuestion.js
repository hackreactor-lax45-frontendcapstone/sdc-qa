const db = require('../../database/index');

module.exports = (req, res) => {
  // console.log('\x1b[35m%s\x1b[0m', 'PUT /qa/questions/:question_id/helpful');

  const { question_id } = req.params;
  db('questions').where({ id: question_id })
    .increment({ helpful: 1 })
    .then((response) => {
      res.status(204).json(response);
    })
    .catch((error) => res.status(404).send(error));
};
