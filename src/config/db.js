var mysql = require('mysql');

var db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Pearlkim05!',
  database: 'test',
});

db.connect();

module.exports = db;

/* db.query('SELECT * FROM member', function (error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

db.end(); */
