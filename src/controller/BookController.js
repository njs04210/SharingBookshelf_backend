const bookModel = require('../models/book');
const statusCode = require('../modules/statusCode');

exports.getBook = async (req, res) => {
  const bookId = req.params.bookId;
  const book = await bookModel.find(bookId);
  const total = await bookModel.getTotal(bookId);
  const category = await bookModel.getCategory(bookId);
  book.category = category;
  book.total_inShelf = total.total;

  if (book == undefined) {
    res.status(statusCode.NOT_FOUND).json(book);
  } else {
    res.status(statusCode.OK).json(book);
  }
};
