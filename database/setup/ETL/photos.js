// Required modules
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const copyFrom = require('pg-copy-streams').from;
const config = require('../../config/config');

module.exports = (extension) => {
  const target = 'photos';
  console.log(`${target}: copying data from file.`);
  // Input file & target table
  const inputFile = path.join(__dirname, `../../../data/${extension}${target}.csv`);

  const pool = new Pool(config);

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      const stream = client.query(copyFrom(`COPY ${target} FROM STDIN CSV header`));
      const fileStream = fs.createReadStream(inputFile);
      fileStream.on('error', (error) => {
        console.log(`${target}: (fileStream) ${error}`);
        reject();
      });
      stream.on('error', (error) => {
        console.log(`${target}: (stream) ${error}`);
        reject();
      });
      stream.on('finish', () => {
        console.log(`${target}: completed loading data into table.`);
        client.end();
        done();
        resolve();
      });
      fileStream.pipe(stream);
    });
  });
};
