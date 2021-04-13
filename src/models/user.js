const db = require('../config/db');
const Promise = require('es6-promise').Promise;

exports.checkUserExist = function (UserRecord) {
  const email = UserRecord.email;
  const name = UserRecord.displayName;
  const photoURL = UserRecord.photoURL;
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM member WHERE email = ?`,
      [email],
      function (err, results) {
        if (err) reject(err);
        if (results[0] == undefined) {
          //member 테이블에 email없는 상태(undefined)면 insert
          db.query(
            `INSERT INTO member (email, name, photoURL, created) VALUES (?, ? ,?, NOW())`,
            [email, name, photoURL],
            function (err) {
              if (err) reject(err);
              db.query(
                `INSERT INTO kids(mem_id) SELECT mem_id FROM member WHERE email = ?`,
                [email],
                function (err) {
                  if (err) reject(err);
                  resolve({ flag: 0 });
                }
              );
            }
          );
        } else {
          //member 테이블에 이미 존재하는 회원일때. != undefined
          resolve({ flag: 1 });
        }
      }
    );
  });
};

exports.setAccessToken = async (email, accessToken) => {
  db.query(
    `UPDATE member SET password=? WHERE email=?`,
    [accessToken, email],
    function (err, res) {
      if (err) throw err;
      return res;
    }
  );
};

exports.settings = function (data) {
  const { address, nickname, sex, photoURL } = data.body;
  const email = data.email;
  const age = data.body.age.slice(0, -1);
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE member SET area=?, nickname=?, photoURL=? WHERE email=?`,
      [address, nickname, photoURL, email],
      function (err) {
        if (err) reject(err);
        db.query(
          `SELECT mem_id FROM member WHERE email=?`,
          [email],
          function (err, result) {
            if (err) reject(err);
            const mem_id = result[0].mem_id;
            db.query(
              `UPDATE kids SET age=?, sex=? WHERE mem_id=?`,
              [age, sex, mem_id],
              function (err, result) {
                if (err) reject(err);
                resolve(result);
              }
            );
          }
        );
      }
    );
  });

  /* db.query(`UPDATE member SET area=?, nickname=? WHERE email=?`, [
    address,
    nickname,
    email,
  ]),
    function (err, res) {
      if (err) throw err;
      return res;
    }; */
};
