// Required modules
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const copyFrom = require('pg-copy-streams').from;
const config = require('../config/config');

module.exports = (target) => {
  console.log(`Copying data from file to ${target} table.`);
  // Input file & target table
  const inputFile = path.join(__dirname, `../../data/${target}.csv`);

  const pool = new Pool(config);
  pool.connect((err, client, done) => {
    const stream = client.query(copyFrom(`COPY ${target} FROM STDIN CSV header`));
    const fileStream = fs.createReadStream(inputFile);

    fileStream.on('error', (error) => {
      console.log(`${target} error in reading file: ${error}`);
      done();
    });

    stream.on('error', (error) => {
      console.log(`${target} error in copy command: ${error}`);
      done();
    });

    stream.on('finish', () => {
      console.log(`Completed loading data into ${target}.`);
      client.end();
      done();
    });

    fileStream.pipe(stream);
  });
};
