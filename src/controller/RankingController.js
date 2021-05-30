const statusCode = require('../modules/statusCode');
const rankingModel = require('../models/ranking');
const bookModel = require('../models/book');
const bookshelfModel = require('../models/bookshelf');
const userModel = require('../models/user');

exports.get = async (req, res) => {
  const rankingData = await rankingModel.getBooks();
  var result = new Array();
  var jsonData, bookData;
  if (rankingData != undefined) {
    for (let i = 0; i < rankingData.length; i++) {
      bookData = await bookModel.find(rankingData[i].book_id);
      bookData = JSON.parse(JSON.stringify(bookData));
      jsonData = {
        ranking: i + 1,
        total: rankingData[i].count,
        book: bookData,
      };
      result.push(jsonData);
    }
    res
      .status(statusCode.OK)
      .json({ code: 80, msg: '랭킹 불러오기 성공', result: result });
  } else {
    res
      .status(statusCode.NOT_FOUND)
      .json({ code: 81, msg: '랭킹을 불러올 수 없음.' });
  }
};

exports.getReportsRanking = async (req, res) => {
  const reports_TotalData = await bookshelfModel.getReportsCounting();
  if (reports_TotalData != undefined) {
    var result = new Array();
    for (let i = 0; i < reports_TotalData.length; i++) {
      var userData = await userModel.find(reports_TotalData[i].mem_id);
      userData = JSON.parse(JSON.stringify(userData));
      var kidsData = await userModel.getKids(reports_TotalData[i].mem_id);
      var user = {
        mem_id: userData.mem_id,
        name: userData.name,
        photoURL: userData.photoURL,
        nickname: userData.nickname,
      };
      var kids = {
        age: kidsData.age,
        sex: kidsData.sex,
      };
      var data = {
        ranking: i + 1,
        user: user,
        kids: kids,
        total: reports_TotalData[i].total,
      };
      result.push(data);
    }
    res
      .status(statusCode.OK)
      .json({ code: 82, msg: '독서짱 랭킹 불러오기 성공', result: result });
  }
};
