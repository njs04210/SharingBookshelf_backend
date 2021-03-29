const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
var db = require('../config/db');
var express = require('express');
var router = express.Router();

var authController = require('../controller/AuthController');

//POST checkGoogleToken
router.post('/', authController.verifyGoogleToken);

/* var serviceAccount = require('../../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// idToken comes from the client app
router.post('/', function (req, res) {
  const idToken = req.headers.authorization.split('Bearer ')[1];
  const secret = req.app.get('jwt-secret');
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedIdToken => {
      console.log('ID Token correctly decoded', decodedIdToken);
      admin
        .auth()
        .getUser(decodedIdToken.uid)
        .then(UserRecord => {
          var email = UserRecord.email;
          var name = UserRecord.displayName;
          var password = UserRecord.uid;
          var photoURL = UserRecord.photoURL;
          db.query(
            `SELECT * FROM member WHERE email = ?`,
            [email],
            function (err, results) {
              if (err) throw err;
              if (results[0] == undefined) {
                //member 테이블에 email없는 상태(undefined)면 insert
                db.query(
                  `INSERT INTO member (email, name, password, photoURL) VALUES (?, ? ,? ,?)`,
                  [email, name, password, photoURL],
                  function (err, results2) {
                    if (err) throw err;
                    console.log(results2[0]);
                    res.status(201).json({
                      code: 201,
                      message: `새로운 회원 ${name}님, 환영합니다!`,
                    });
                    //res.send({ code: 200, message: `${name}님, 환영합니다!` });
                  }
                );
              } else {
                //member 테이블에 이미 존재하는 회원일때. != undefined
                res.json({
                  code: 200,
                  message: `다시 찾아주신 ${name}님, 환영합니다!`,
                });
              }
            }
          );
        })
        .catch(error => {
          console.error('Error while getting Firebase User record:', error);
          res.json({ code: 403, error: 'Unauthorized' });
        });
    })
    .catch(error => {
      console.error('Error while verifying Firebase ID token:', error);
      res.json({ code: 403, error: 'Unauthorized' });
    });
}); */

module.exports = router;
