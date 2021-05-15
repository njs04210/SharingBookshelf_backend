const db = require('../config/db');
const Promise = require('es6-promise').Promise;

exports.create = function (memId, bookId, content) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE Memo SET content = ?, created = NOW() WHERE book_id = ? AND mem_id = ?`,
      [content, bookId, memId],
      function (err) {
        if (err) reject(err);
        else {
          resolve(1);
        }
      }
    );
  });
};

exports.find = function (memId, bookId) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT content, created FROM Memo WHERE mem_id = ? AND book_id = ?`,
      [memId, bookId],
      function (err, res) {
        if (err) reject(err);
        else resolve(res[0]);
      }
    );
  });
};

exports.findAll = function (memId) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM Memo WHERE mem_id = ? AND content IS NOT NULL`,
      [memId],
      function (err, res) {
        if (err) reject(err);
        else resolve(res);
      }
    );
  });
};
