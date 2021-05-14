const memoModel = require('../models/memo');
const statusCode = require('../modules/statusCode');

exports.create = async (req, res) => {
  const memId = req.memId;
  const isbn = req.body.ISBN;
  const content = req.body.content;

  const memoStatus = await memoModel.create(memId, isbn, content);
  if (memoStatus == 1) {
    res.status(statusCode.OK).json({ code: 1, msg: '메모 저장' });
  } else {
    console.log('실패');
  }
};

exports.find = async (req, res) => {
  const memId = req.memId;
  const isbn = req.params.isbn;
  const memoStatus = await memoModel.find(memId, isbn);
  if (memoStatus.content != null) {
    res.status(statusCode.OK).json(memoStatus);
  } else {
    res.status(statusCode.NOT_FOUND).json(memoStatus);
  }
};
