const admin = require('firebase-admin');
const jwt = require('../modules/jwt');
const userModel = require('../models/user');
const serviceAccount = require('../config/serviceAccountKey.json');
const statusCode = require('../modules/statusCode');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.login = function (req, res) {
  /* Verify Google Token */
  const GoogleToken = req.headers.authorization.split('Bearer ')[1];
  admin
    .auth()
    .verifyIdToken(GoogleToken)
    .then((decodedIdToken) => {
      admin
        .auth()
        .getUser(decodedIdToken.uid)
        .then((UserRecord) => {
          //DB에서 회원정보 확인하기
          userModel.checkUserExist(UserRecord).then((results) => {
            const flag = results.flag;
            const memId = results.memId;
            UserRecord.memId = memId;
            //jwt 발급
            jwt.sign(UserRecord).then((jwtToken) => {
              const accessToken = jwtToken.accessToken;
              const email = UserRecord.email;
              userModel.setAccessToken(email, accessToken).then(() => {
                return res.status(statusCode.OK).json({
                  flag,
                  msg: '정상 회원 등록',
                  accessToken,
                  memId,
                });
              });
            });
          });
        });
    })
    .catch((error) => {
      console.error('Error while verifying Firebase ID token:', error);
      res.status(statusCode.FORBIDDEN).json({ msg: 'Unauthorized' });
    });
};

exports.setInfo = async (req, res) => {
  await userModel
    .settings(req)
    .then(() => {
      res.status(statusCode.OK).json({ msg: '신규회원 정보등록 성공' });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getInfo = async (req, res) => {
  const memId = req.params.memId;
  var memInfo = await userModel.find(memId);
  const kidsInfo = await userModel.getKids(memId);
  if (memInfo == undefined) {
    res.status(statusCode.NOT_FOUND).json({ code: 0 });
  } else {
    var flag = delete memInfo['password'];
    if (flag) {
      res.status(statusCode.OK).json({
        code: 21,
        msg: '회원 정보 불러오기 성공',
        user: memInfo,
        kids: { sex: kidsInfo.sex, age: kidsInfo.age },
      });
    }
  }
};
