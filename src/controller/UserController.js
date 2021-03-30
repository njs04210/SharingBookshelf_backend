const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
require('dotenv').config();

var serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {
  login: function (req, res) {
    /* Verify Google Token */
    const idToken = req.headers.authorization.split('Bearer ')[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedIdToken => {
        console.log('ID Token correctly decoded', decodedIdToken);
        admin
          .auth()
          .getUser(decodedIdToken.uid)
          .then(UserRecord => {
            console.log(UserRecord);
            var email = UserRecord.email;
            var name = UserRecord.displayName;
            var password = UserRecord.uid;
            var photoURL = UserRecord.photoURL;
            /* 신규회원인지 기존회원인지 확인하고 신규회원이면 쿼리하는 과정 */
            userModel
              .checkUserExist(email, password, name, photoURL)
              .then(result => {
                var created_date = result.created;
                var flag = result.flag;
                console.log(flag);
                /* jwt.sign() => 토큰 발급 */
                try {
                  const token = jwt.sign(
                    {
                      email,
                      name,
                      created_date,
                    },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: '1d', // 1일
                      issuer: 'iBookShare',
                    }
                  );
                  return res.json({
                    code: 200,
                    message: '토큰이 정상 발급되었습니다.',
                    flag,
                    token,
                  });
                } catch (error) {
                  console.error(error);
                  return res.status(500).json({
                    code: 500,
                    message: '서버 에러',
                  });
                }
              });
          });
      })
      .catch(error => {
        console.error('Error while verifying Firebase ID token:', error);
        res.json({ code: 403, message: 'Unauthorized' });
      });
  },
};
