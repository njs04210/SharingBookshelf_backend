var mysql = require('mysql');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Pearlkim05!',
  database: 'test',
});

db.connect();

module.exports = db;
