const db = require('../config/db');
const Promise = require('es6-promise').Promise;

exports.find = function (bookId) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM Book WHERE book_id = ?`,
      [bookId],
      function (err, res) {
        if (err) reject(err);
        else {
          resolve(res);
        }
      }
    );
  });
};
