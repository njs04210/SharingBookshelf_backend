var db = require('../config/db');
var Promise = require('es6-promise').Promise;

module.exports = {
  checkUserExist: function (email, password, name, photoURL) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM member WHERE email = ?`,
        [email],
        function (err, results) {
          if (err) reject(err);
          if (results[0] == undefined) {
            //member 테이블에 email없는 상태(undefined)면 insert
            db.query(
              `INSERT INTO member (email, name, password, photoURL, created) VALUES (?, ? ,? ,?, NOW())`,
              [email, name, password, photoURL],
              function (err, result) {
                if (err) reject(err);
                resolve(result);
              }
            );
          } else {
            //member 테이블에 이미 존재하는 회원일때. != undefined
            resolve(results[0]);
          }
        }
      );
    });
  },

  /* checkUserExist: function (email, password, name, photoURL) {
    db.query(
      `SELECT * FROM member WHERE email = ?`,
      [email],
      function (err, results) {
        if (err) throw err;
        if (results[0] == undefined) {
          //member 테이블에 email없는 상태(undefined)면 insert
          db.query(
            `INSERT INTO member (email, name, password, photoURL, created) VALUES (?, ? ,? ,?, NOW())`,
            [email, name, password, photoURL],
            function (err, result) {
              if (err) throw err;
              return 0;
            }
          );
        } else {
          //member 테이블에 이미 존재하는 회원일때. != undefined
          return 1;
        }
      }
    );
  }, */
};
