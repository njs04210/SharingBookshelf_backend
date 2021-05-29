const statusCode = require('../modules/statusCode');
const rankingModel = require('../models/ranking');
const bookModel = require('../models/book');

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
