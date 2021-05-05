const db = require('../config/db');
const Promise = require('es6-promise').Promise;

exports.checkUserExist = function (UserRecord) {
  const email = UserRecord.email;
  const name = UserRecord.displayName;
  //const photoURL = UserRecord.photoURL;
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM Member WHERE email = ?`,
      [email],
      function (err, results) {
        if (err) reject(err);
        if (results[0] == undefined) {
          //member 테이블에 email없는 상태(undefined)면 insert
          db.query(
            `INSERT INTO Member (email, name,  created) VALUES (?, ? , NOW())`,
            [email, name],
            function (err) {
              if (err) reject(err);
              db.query(
                `INSERT INTO Kids(mem_id) SELECT mem_id FROM Member WHERE email = ?`,
                [email],
                function (err) {
                  if (err) reject(err);
                  db.query(
                    `SELECT mem_id FROM Member WHERE email =?`,
                    [email],
                    function (err, res) {
                      if (err) reject(err);
                      const memId = res[0].mem_id;
                      resolve({ flag: 0, memId });
                    }
                  );
                }
              );
            }
          );
        } else {
          //member 테이블에 이미 존재하는 회원일때. != undefined
          const memId = results[0].mem_id;
          resolve({ flag: 1, memId });
        }
      }
    );
  });
};

exports.setAccessToken = async (email, accessToken) => {
  db.query(
    `UPDATE Member SET password=? WHERE email=?`,
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
      `UPDATE Member SET area=?, nickname=?, photoURL=? WHERE email=?`,
      [address, nickname, photoURL, email],
      function (err) {
        if (err) reject(err);
        db.query(
          `SELECT mem_id FROM Member WHERE email=?`,
          [email],
          function (err, result) {
            if (err) reject(err);
            const mem_id = result[0].mem_id;
            db.query(
              `UPDATE Kids SET age=?, sex=? WHERE mem_id=?`,
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

exports.find = function (memId) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * from Member WHERE mem_id=?`,
      [memId],
      function (err, res) {
        if (err) reject(err);
        else resolve(res[0]);
      }
    );
  });
};
