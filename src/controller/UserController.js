const admin = require('firebase-admin');
const jwt = require('../modules/jwt');
const userModel = require('../models/user');
const serviceAccount = require('../config/serviceAccountKey.json');
const statusCode = require('../modules/statusCode');

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
      .then((decodedIdToken) => {
        admin
          .auth()
          .getUser(decodedIdToken.uid)
          .then((UserRecord) => {
            //DB에서 회원정보 확인하기
            userModel.checkUserExist(UserRecord).then((results) => {
              const flag = results.flag;
              jwt.sign(UserRecord).then((jwtToken) => {
                const accessToken = jwtToken.accessToken;
                return res.status(statusCode.OK).json({
                  flag,
                  message: '정상 토큰발급',
                  accessToken,
                });
              });
            });
          });
      });
  },
};
