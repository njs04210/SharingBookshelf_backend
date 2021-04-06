const db = require('../config/db');
const Promise = require('es6-promise').Promise;

module.exports = {
  checkUserExist: function (UserRecord) {
    var email = UserRecord.email;
    var name = UserRecord.displayName;
    var password = UserRecord.uid;
    var photoURL = UserRecord.photoURL;
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
              function (err) {
                if (err) reject(err);
                db.query(
                  `SELECT mem_id FROM member WHERE email = ?`,
                  [email],
                  function (err, result) {
                    if (err) reject(err);
                    resolve({ flag: 0, mem_id: result[0].mem_id });
                  }
                );
              }
            );
          } else {
            //member 테이블에 이미 존재하는 회원일때. != undefined
            resolve({ flag: 1, mem_id: results[0].mem_id });
          }
        }
      );
    });
  },
};
