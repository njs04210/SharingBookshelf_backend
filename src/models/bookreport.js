const db = require('../config/db');
const Promise = require('es6-promise').Promise;

exports.create = function (item_id, report) {
  const canvas_uri = report.canvas_uri;
  const contents = report.contents;
  const created = report.created;

  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO BookReport (item_id, contents, canvas_uri, created) VALUES (?,?,?,?)`,
      [item_id, contents, canvas_uri, created],
      function (err, res) {
        if (err) reject(err);
        else {
          resolve(res);
        }
      }
    );
  });
};
