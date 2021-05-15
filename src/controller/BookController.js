const bookModel = require('../models/book');
const statusCode = require('../modules/statusCode');

exports.getBook = async (req, res) => {
  const bookId = req.params.bookId;
  const book = await bookModel.find(bookId);
  if (book == undefined) {
    res.status(statusCode.NOT_FOUND).json(book[0]);
  } else {
    res.status(statusCode.OK).json(book[0]);
  }
};
