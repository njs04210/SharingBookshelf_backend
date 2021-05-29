const db = require('../config/db');
const Promise = require('es6-promise').Promise;

exports.getBooks = function () {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT book_id, count(book_id) AS count FROM Bookshelf_item GROUP BY book_id ORDER BY count DESC limit 10`,
      function (err, res) {
        if (err) reject(err);
        else {
          var rankingDataSet = new Array();
          for (let i = 0; i < res.length; i++) {
            var bookData = JSON.parse(JSON.stringify(res[i]));
            rankingDataSet.push(bookData);
          }
          resolve(rankingDataSet);
        }
      }
    );
  });
};
