const express = require('express');
const router = require('./routers');
const db = require('../database/index');

const HOST = '0.0.0.0';
const PORT = 3000;

const app = express();
app.use('/hello', (req, res) => res.status(200).send('Wingardium, leviosa!\n'));
app.use('/', router);

app.use('/test', (req, res) => {
  db('questions').select('date_written')
    .then((rows) => rows.map((row) => row.date_written))
    .then((dates) => res.status(200).json(dates));
});

app.listen(PORT, HOST, () => console.log(`Connected on http://${HOST}:${PORT}`));
