var mysql = require('mysql');

const db = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: '',
  dateStrings: '',
});

db.connect();

module.exports = db;
