const admin = require('firebase-admin');
const jwt = require('../modules/jwt');
const userModel = require('../models/user');
const bookreportModel = require('../models/bookreport');
const bookshelfModel = require('../models/bookshelf');
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

exports.getAnalysis = async (req, res) => {
  const memId = req.memId;
  var result = {};
  var kidsData = await userModel.getKids(memId);
  var bookshelfData = await bookshelfModel.find(memId);
  if (bookshelfData != undefined) {
    bookshelfData = JSON.parse(JSON.stringify(bookshelfData));
    var bookshelf_id = bookshelfData.bookshelf_id;
    var countCategoryData = await bookshelfModel.countBooksCategory(
      bookshelf_id
    ); // 카테고리 별로 몇개?
    if (countCategoryData != 0) {
      var totalBooks = await bookshelfModel.getTotalBooks(bookshelf_id); // 총 책 개수

      var NoReportData = await bookreportModel.findItemNoReport(bookshelf_id);
      var totalNoReport;
      if (NoReportData == 0) {
        totalNoReport = 0;
      } else {
        totalNoReport = NoReportData.length;
      }
      var totalYesReport = totalBooks - totalNoReport; // 독후감 총 개수
      var countingRead = await bookshelfModel.countBooksDate(bookshelf_id); // 오늘, 지난1주일, 지난 2주일 읽은 책 수

      result.countCategory = countCategoryData;
      result.totalBooks = totalBooks;
      result.totalReports = {
        Not_Written: totalNoReport,
        Written: totalYesReport,
      };
      result.totalPerDate = countingRead;

      var kidsId = await bookshelfModel.getBookshelfId_sameKids(
        memId,
        kidsData.age
      );
      if (kidsId != 0) {
        var totalOthers = 0;
        for (let i = 0; i < kidsId.length; i++) {
          var oneData = await bookshelfModel.countBooksDate(kidsId[i]);
          totalOthers += oneData.minus;
          if (i == kidsId.length - 1) {
            var avg = totalOthers / kidsId.length; //  내 나이, 성별과 같은 아이는 저번주보다 이번주에 얼마만큼 더 읽었는지 (평균)
            result.avg_Others = avg;
            res
              .status(statusCode.OK)
              .json({ code: 82, msg: '책장 분석 성공', result: result });
          }
        }
      } else {
        res
          .status(statusCode.OK)
          .json({ code: 81, msg: '책장 분석 성공', result: result });
      }
    } else {
      res
        .status(statusCode.NOT_FOUND)
        .json({ code: 84, msg: '등록된 책이 없음' });
    }
  } else {
    res
      .status(statusCode.NOT_FOUND)
      .json({ code: 83, msg: '책장이 존재하지 않음' });
  }
};
