const db = require('../config/db');
const Promise = require('es6-promise').Promise;

exports.create = function (report) {
  const item_id = report.item_id;
  const canvas_uri = report.canvas_uri;
  const contents = report.contents;

  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO BookReport (item_id, contents, canvas_uri, created) VALUES (?,?,?,NOW())`,
      [item_id, contents, canvas_uri],
      function (err) {
        if (err) reject(err);
        else {
          db.query(
            `SELECT bookreport_id FROM BookReport WHERE item_id =?`,
            [item_id],
            function (err, res) {
              if (err) reject(err);
              else {
                const bookrepot_id = res[0].bookreport_id;
                db.query(
                  `UPDATE Bookshelf_item SET bookreport_id =? WHERE item_id =?`,
                  [bookrepot_id, item_id],
                  function (err, res) {
                    if (err) reject(err);
                    else resolve(res);
                  }
                );
              }
            }
          );
        }
      }
    );
  });
};

exports.findItem = function (bookshelf_id) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM Bookshelf_item WHERE bookshelf_id = ? AND bookreport_id IS NOT NULL ORDER BY bookreport_id`,
      [bookshelf_id],
      function (err, res) {
        if (err) reject(err);
        else {
          if (res[0] == undefined) {
            resolve(0); // 작성한 독후감 없음
          }
          const items = JSON.parse(JSON.stringify(res));
          resolve(items);
        }
      }
    );
  });
};

exports.findItemNoReport = function (bookshelf_id) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT item_id, book_id FROM Bookshelf_item WHERE bookshelf_id = ? AND bookreport_id IS NULL`,
      [bookshelf_id],
      function (err, res) {
        if (err) reject(err);
        else {
          if (res[0] == undefined) {
            resolve(0); // 작성안된 독후감 없음
          }
          const items = JSON.parse(JSON.stringify(res));
          resolve(items);
        }
      }
    );
  });
};

exports.getReport = function (item_id) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM BookReport WHERE item_id = ?`,
      [item_id],
      function (err, res) {
        if (err) reject(err);
        else {
          resolve(res[0]);
        }
      }
    );
  });
};
