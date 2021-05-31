const bookreportModel = require('../models/bookreport');
const bookshelfModel = require('../models/bookshelf');
const bookModel = require('../models/book');
const statusCode = require('../modules/statusCode');

exports.create = async (req, res) => {
  const report = JSON.parse(JSON.stringify(req.body));
  const reportStatus = await bookreportModel.create(report);
  if (reportStatus != undefined) {
    res.status(statusCode.OK).json({ code: 70, msg: '독후감 정상 등록' });
  }
};

exports.findAll = async (req, res) => {
  var memId = req.memId;
  if (req.params.memId != undefined) {
    memId = req.params.memId;
  }
  const qs = req.query.available;
  var bookshelf = await bookshelfModel.find(memId);
  var result, book_info, report_info, data;
  if (qs == undefined) {
    var reportData = await bookreportModel.findItem(bookshelf.bookshelf_id);
    if (reportData == 0) {
      res
        .status(statusCode.NOT_FOUND)
        .json({ code: 71, msg: '작성된 독후감이 없습니다.' });
    } else {
      result = new Array();
      for (let i = 0; i < reportData.length; i++) {
        book_info = await bookModel.find(reportData[i].book_id);
        book_info = JSON.parse(JSON.stringify(book_info));
        report_info = await bookreportModel.getReport(reportData[i].item_id);
        report_info = JSON.parse(JSON.stringify(report_info));

        data = {
          book: {
            book_id: book_info.book_id,
            title: book_info.title,
            thumbnail: book_info.thumbnail,
          },
          bookreport: report_info,
        };
        result.push(data);
      }
      res.status(statusCode.OK).json({
        code: 72,
        msg: '작성된 독후감 리스트 불러오기 성공',
        bookReports: result,
      });
    }
  } else if (qs == 'true') {
    var noReportData = await bookreportModel.findItemNoReport(
      bookshelf.bookshelf_id
    );
    if (noReportData == 0) {
      res
        .status(statusCode.NOT_FOUND)
        .json({ code: 73, msg: '작성 가능한 독후감이 없습니다.' });
    } else {
      result = new Array();
      for (let i = 0; i < noReportData.length; i++) {
        var item_id = noReportData[i].item_id;
        book_info = await bookModel.find(noReportData[i].book_id);
        book_info = JSON.parse(JSON.stringify(book_info));

        data = {
          item_id: item_id,
          book: {
            book_id: book_info.book_id,
            title: book_info.title,
            thumbnail: book_info.thumbnail,
          },
        };
        result.push(data);
      }
      res.status(statusCode.OK).json({
        code: 74,
        msg: '작성안된 독후감 리스트 불러오기 성공',
        books_NoReport: result,
      });
    }
  }
};

exports.findOne = async (req, res) => {
  const itemId = req.params.itemId;
  const reportData = await bookreportModel.getReport(itemId);
  if (reportData != undefined) {
    res.status(statusCode.OK).json({
      code: 75,
      msg: '선택한 독후감 내용 불러오기 성공',
      report: reportData,
    });
  }
};
