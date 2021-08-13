/* eslint-disable camelcase */
require('../newrelic.js');
const express = require('express');
const cors = require('cors');

const router = require('./routers/index');
const { SERVER } = require('./config/constants');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/qa', router);
app.use('/hello', (req, res) => res.status(200).send('Wingardium, leviosa!\n'));

app.listen(SERVER.PORT, SERVER.HOST, () => console.log(`Connected on http://${SERVER.HOST}:${SERVER.PORT}`));
