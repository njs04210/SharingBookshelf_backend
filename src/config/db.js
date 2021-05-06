const mysql = require('mysql');

const db = mysql.createConnection({
  host: '101.101.219.107',
  user: 'root',
  password: '',
  database: 'iBookShare2',
  dateStrings: 'date',
});

/* const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'iBookShare',
  dateStrings: 'date',
}); */

db.connect();

module.exports = db;
