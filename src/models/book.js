const db = require('../config/db');
const Promise = require('es6-promise').Promise;

exports.find = function (isbn) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM Book WHERE ISBN = ?`, [isbn], function (err, res) {
      if (err) reject(err);
      else {
        resolve(res);
      }
    });
  });
};
