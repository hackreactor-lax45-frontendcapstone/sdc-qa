/* eslint-disable camelcase */
const express = require('express');
const router = require('./routers/index');
const { SERVER } = require('./config/constants');

const app = express();

app.use('/qa', router);
app.use('/hello', (req, res) => res.status(200).send('Wingardium, leviosa!\n'));

app.listen(SERVER.PORT, SERVER.HOST, () => console.log(`Connected on http://${SERVER.HOST}:${SERVER.PORT}`));
