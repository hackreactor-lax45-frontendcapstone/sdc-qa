/* eslint-disable camelcase */
require('newrelic');

const express = require('express');
const cors = require('cors');
const path = require('path');

const router = require('./routers/index');
const { SERVER } = require('./config/constants');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/qa', router);

const Cache = require('./cache/index');

const Cache_Middleware = (req, res, next) => {
  Cache.get('hello')
    .then((response) => {
      if (response.value !== null) {
        res.status(200).send(response.value.toString());
      } else {
        Cache.set('hello', 'Expelliarmus!');
        next();
      }
    })
    .catch((error) => {
      console.log(`Error! (${error})`);
      next();
    });
};

app.use('/hello', Cache_Middleware, (req, res) => res.status(200).send('Wingardium, leviosa!\n'));
app.use(express.static(path.join(__dirname, '../public')));

app.listen(SERVER.PORT, SERVER.HOST, () => console.log(`Connected on http://${SERVER.HOST}:${SERVER.PORT}`));
