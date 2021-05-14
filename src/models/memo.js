const db = require('../config/db');
const Promise = require('es6-promise').Promise;

exports.create = function (memId, isbn, content) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE Memo SET content = ?, created = NOW() WHERE ISBN = ? AND mem_id = ?`,
      [content, isbn, memId],
      function (err, res) {
        if (err) reject(err);
        else {
          resolve(1);
        }
      }
    );
  });
};

exports.find = function (memId, isbn) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT content, created FROM Memo WHERE mem_id = ? AND ISBN = ?`,
      [memId, isbn],
      function (err, res) {
        if (err) reject(err);
        else resolve(res[0]);
      }
    );
  });
};
