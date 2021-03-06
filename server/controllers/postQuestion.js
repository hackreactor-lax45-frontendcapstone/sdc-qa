const db = require('../../database/index');

module.exports = (req, res) => {
  // console.log('\x1b[33m%s\x1b[0m', 'POST /qa/questions');

  const {
    body,
    name,
    email,
    product_id,
  } = req.body;

  const question = {
    product_id,
    body,
    date_written: Date.now(),
    asker_name: name,
    asker_email: email,
    reported: false,
    helpful: 0,
  };

  db('questions').insert(question)
    .then(() => res.sendStatus(201))
    .catch((error) => res.status(404).send(error));
};
