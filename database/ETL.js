// Required modules
const fs = require('fs');
const path = require('path');
const { Pool, Client } = require('pg');
const copyFrom = require('pg-copy-streams').from;
const config = require('./config.json');

// Input file & target table
const inputFile = path.join(__dirname, '/data/example.csv');
const targetTable = 'usermanaged.customers';

const {
  host, user, pw, db, port,
} = config;

const conString = `postgres://${user}:${pw}@${host}:${port}/${db}`;

const client = new Client({
  connectionString: conString,
});

client.connect();

const stream = client.query(copyFrom(`COPY ${targetTable} FROM CSV HEADER STDIN`));
const fileStream = fs.createReadStream(inputFile);

fileStream.on('error', (error) => console.log(`Error in reading file: ${error}`));
stream.on('error', (error) => console.log(`Error in copy command: ${error}`));
stream.on('end', () => {
  console.log(`Completed loading data into ${targetTable}`);
  client.end();
});

fileStream.pipe(stream);
