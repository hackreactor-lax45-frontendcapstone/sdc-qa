// Required modules
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const copyFrom = require('pg-copy-streams').from;
const config = require('./config');

// Input file & target table
const target = 'photos';
const inputFile = path.join(__dirname, `../data/${target}.csv`);

const pool = new Pool(config);
pool.connect((err, client, done) => {
  const stream = client.query(copyFrom(`COPY ${target} FROM STDIN CSV header`));
  const fileStream = fs.createReadStream(inputFile);

  fileStream.on('error', (error) => {
    console.log(`Error in reading file: ${error}`);
    done();
  });

  stream.on('error', (error) => {
    console.log(`Error in copy command: ${error}`);
    done();
  });

  stream.on('finish', () => {
    console.log(`Completed loading data into ${target}`);
    client.end();
    done();
  });

  fileStream.pipe(stream);
});
