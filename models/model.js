const pg = require("pg");
const uri = 'postgres://cwilliams:12345@localhost:5432/testing'

async function queryBin(path) {
  // Return true if the bin exists
  const client = new pg.Client(uri);
  client.connect();

  let valueExists;

  await client.query(`SELECT * FROM bin WHERE path='${path}'`).then((queryRes) => {
    valueExists = queryRes.rows.length > 0;
  }).finally(() => client.end());

  return valueExists
};

async function queryBinId(path) {
  // Return the bin id of the bin with the argument's path

  const client = new pg.Client(uri);
  client.connect();

  let binId;

  await client.query(`SELECT * FROM bin WHERE path='${path}'`).then((queryRes) => {
    binId = queryRes.rows[0].id
  }).finally(() => client.end());

  return binId
};

async function insertParsedRequest(requestData) {
  // Insert a new request to the parsed request entity

  const client = new pg.Client(uri);
  client.connect();

  await client.query(`INSERT INTO parsed_request VALUES (DEFAULT, ${requestData.binId}, '${requestData.rawBody}', '${requestData.rawHeaders}', '${requestData.query}', '${requestData.path}', DEFAULT, '${requestData.method}')`).finally(() => client.end());
}

async function getBinRequests(path) {
  // Return an array of all of the bin's requests

  const client = new pg.Client(uri);
  client.connect();

  let requests;

  await client.query(`SELECT * FROM parsed_request WHERE path='/bins/${path}'`).then((res) => {
    requests = res.rows;
  }).finally(() => {
    client.end()
  });

  return requests;
}

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

module.exports = { createBin, queryBin, queryBinId, generateRandomAlphanumericLength30, insertParsedRequest, getBinRequests }

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
