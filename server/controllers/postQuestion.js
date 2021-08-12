const { GET_ANSWERS } = require('../config/constants');
const db = require('../../database/test/index');

module.exports = (req, res) => {
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
  console.log(question);

  db('questions').insert(question)
    .then(() => res.sendStatus(201))
    .catch((error) => res.status(404).send(error));
};
