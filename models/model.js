const pg = require("pg");
const uri = 'postgres://reader:12345@localhost:5432/request_bin'

async function queryBin(path) {
  const client = new pg.Client(uri);
  client.connect();

  let valueExists;

  await client.query(`SELECT * FROM bin WHERE path='${path}'`).then((queryRes) => {
    valueExists = queryRes.rows.length > 0;
  }).finally(() => client.end());

  return valueExists
};

/*
Tasks:
- Query for the bin and pass callbacks if it exists and doesn't exist
*/

async function createBin(path) {
  const client = new pg.Client(uri);

  client.connect();

  await client.query(`INSERT INTO bin VALUES (DEFAULT, '${path}', CURRENT_DATE)`).then(() => {
    client.end();
  });
}

function generateRandomAlphanumericLength30() {
  // Generates an alphanumeric string of length 30
  // Makes duplicate strings extremely unlikely
  return Array.from(Array(30), () => Math.floor(Math.random() * 36).toString(36)).join('');
}

getBin = (path) => 'https://requestbin.net' + path

queryBin('1ozm1furggsjfwrf41xk8xb8hjt3ll!')

module.exports = { createBin, queryBin, generateRandomAlphanumericLength30 }

/*

Understanding PostgreSQL URIs

https://www.enterprisedb.com/postgres-tutorials/how-quickly-build-api-using-nodejs-postgresql

postgres://user:pass@example.com:5432/dbname

postgres://reader:@example.com:5432/request_bin

Username: reader
Password: Jdpa1995!
Port: 5432 -> default postgresql port
Database name: request_bin

*/