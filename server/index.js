/* eslint-disable camelcase */
require('newrelic');
const express = require('express');
const cluster = require('cluster');
const cors = require('cors');
const CPUs = require('os').cpus().length;
const process = require('process');

const router = require('./routers/index');
const { SERVER } = require('./config/constants');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/qa', router);
app.use('/hello', (req, res) => res.status(200).send('Wingardium, leviosa!\n'));

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < CPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online.`);
  });
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died.`);
  });
} else {
  app.listen(SERVER.PORT, SERVER.HOST, () => console.log(`Connected on http://${SERVER.HOST}:${SERVER.PORT}`));
}
