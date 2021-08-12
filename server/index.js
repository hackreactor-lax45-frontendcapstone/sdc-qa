/* eslint-disable camelcase */
const express = require('express');
const router = require('./routers');
const { PORT, HOST } = require('./config/constants');

const app = express();

app.use('/qa', router);
app.use('/hello', (req, res) => res.status(200).send('Wingardium, leviosa!\n'));

app.listen(PORT, HOST, () => console.log(`Connected on http://${HOST}:${PORT}`));
