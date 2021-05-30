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
          resolve(res[0]);
        }
      }
    );
  });
};

exports.getTotal = function (bookId) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT count(book_id) AS total FROM Bookshelf_item WHERE book_id = ?`,
      [bookId],
      function (err, res) {
        if (err) reject(err);
        else {
          var total = JSON.parse(JSON.stringify(res[0]));
          resolve(total);
        }
      }
    );
  });
};

exports.getCategory = function (bookId) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT book_id, category, count(category) AS total FROM Bookshelf_item WHERE book_id = ? GROUP BY category ORDER BY total DESC`,
      [bookId],
      function (err, res) {
        if (err) reject(err);
        else {
          var result = new Array();
          for (let i = 0; i < res.length; i++) {
            var data = {};
            var countData = JSON.parse(JSON.stringify(res[i]));
            data.category_id = countData.category;
            data.total = countData.total;
            result.push(data);
            if (i == res.length - 1) {
              resolve(result);
            }
          }
        }
      }
    );
  });
};
