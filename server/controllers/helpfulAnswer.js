const db = require('../../database/index');

module.exports = (req, res) => {
  // console.log('\x1b[35m%s\x1b[0m', 'PUT /qa/answers/:answer_id/helpful');

  const { answer_id } = req.params;
  db('answers').where({ id: answer_id })
    .increment({ helpful: 1 })
    .then((response) => {
      console.log(response);
      res.status(204).json(response);
    })
    .catch((error) => res.status(404).send(error));
};
