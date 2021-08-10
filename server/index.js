const express = require('express');
const router = require('./routers');

const HOST = '0.0.0.0';
const PORT = 3000;

const app = express();
app.use('/hello', (req, res) => res.status(200).send('Wingardium, leviosa!\n'));
app.use('/', router);

app.listen(PORT, HOST, () => console.log(`Connected on http://${HOST}:${PORT}`));
