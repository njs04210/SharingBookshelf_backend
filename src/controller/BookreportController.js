const bookreportModel = require('../models/bookreport');
const bookshelfModel = require('../models/bookshelf');
const statusCode = require('../modules/statusCode');

exports.create = async (req, res) => {
  const memId = req.memId;
  const report = JSON.parse(JSON.stringify(req.body));
  const bookshelf = await bookshelfModel.find(memId);
  const bookshelf_item = await bookshelfModel.findItem(
    bookshelf.bookshelf_id,
    report.book_id
  );
  const reportStatus = await bookreportModel.create(
    bookshelf_item.item_id,
    report
  );
  if (reportStatus != undefined) {
    res.status(statusCode.OK).json({ code: 70, msg: '독후감 정상 등록' });
  }
};
