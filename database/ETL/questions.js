// Required modules
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const copyFrom = require('pg-copy-streams').from;

module.exports = (config, extension) => {
  const target = 'questions';
  console.log(`${target}: copying data from file.`);

  const inputFile = path.join(__dirname, `../../data/${extension}${target}.csv`);
  const pool = new Pool(config);
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      const stream = client.query(copyFrom(`COPY ${target} FROM STDIN CSV header`));
      const fileStream = fs.createReadStream(inputFile);
      fileStream.on('error', (error) => {
        console.log(`${target}: (fileStream) ${error}`);
        fileStream.end();
        done();
        reject();
      });
      stream.on('error', (error) => {
        console.log(`${target}: (stream) ${error}`);
        client.end();
        done();
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
