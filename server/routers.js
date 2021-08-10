const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router
  .get('/', controllers)
  .get('/', controllers);

router
  .post('/', controllers)
  .post('/', controllers);

router
  .put('/', controllers)
  .put('/', controllers);

router
  .put('/', controllers)
  .put('/', controllers);

module.exports = router;
