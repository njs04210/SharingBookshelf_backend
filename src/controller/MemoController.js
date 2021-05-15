const memoModel = require('../models/memo');
const statusCode = require('../modules/statusCode');

exports.create = async (req, res) => {
  const memId = req.memId;
  const bookId = req.body.bookId;
  const content = req.body.content;

  const memoStatus = await memoModel.create(memId, bookId, content);
  if (memoStatus == 1) {
    res.status(statusCode.OK).json({ code: 1, msg: '메모 저장' });
  } else {
    console.log('실패');
  }
};

exports.find = async (req, res) => {
  const memId = req.memId;
  const bookId = req.params.bookId;
  const memoStatus = await memoModel.find(memId, bookId);
  if (memoStatus.content != null) {
    res.status(statusCode.OK).json(memoStatus);
  } else {
    res.status(statusCode.NOT_FOUND).json(memoStatus);
  }
};

exports.findAll = async (req, res) => {
  const memId = req.memId;
  const memoSet = await memoModel.findAll(memId);
  res.status(statusCode.OK).json(memoSet);
};
