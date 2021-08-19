const { GET_ANSWERS } = require('../config/constants');
const db = require('../../database/index');

module.exports = (req, res) => {
  const { answer_id } = req.query;
  res.status(200).json(answer_id);
  // db('photos').whereIn('answer_id', answer_id).select(GET_ANSWERS.PHOTO_SELECT)
  //   .then((photos) => {
  //     res.status(200).json(photos);
  //   })
  //   .catch((error) => res.status(404).send(error));
};
