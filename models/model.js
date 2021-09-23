const pg = require("pg");
const uri = 'postgres://reader:12345@localhost:5432/request_bin'

function queryBin(url, httpRes) {
  const client = new pg.Client(uri);
  client.connect();

  client.query(`SELECT * FROM bin WHERE url='${url}'`).then((queryRes) => {
    const valueExists = queryRes.rows.length > 0;

    if (valueExists) {
      const binId = queryRes[0].id
      // Create a raw request entry
    } else {
      console.log(httpRes)
      // httpRes.render('empty', {layout : 'index', binURL: getBin(url)})
    }
  }).finally(() => client.end());
};

/*
Tasks:
- Query for the bin and pass callbacks if it exists and doesn't exist
*/

function createBin(res) {
  const url = generateRandomAlphanumericLength30()
  const client = new pg.Client(uri);

  client.connect();

  client.query(`INSERT INTO bin VALUES (DEFAULT, '${url}', CURRENT_DATE)`).then(() => {
    client.end();
    res.redirect(`/bins/${url}`);
  })
}

function generateRandomAlphanumericLength30() {
  // Generates an alphanumeric string of length 30
  // Makes duplicate strings extremely unlikely
  return Array.from(Array(30), () => Math.floor(Math.random() * 36).toString(36)).join('');
}

getBin = (path) => 'https://requestbin.net' + path

queryBin('1ozm1furggsjfwrf41xk8xb8hjt3ll!')

module.exports = { createBin, queryBin }

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