const bookshelfModel = require('../models/bookshelf');
const statusCode = require('../modules/statusCode');

exports.getShelf = async (req, res) => {
  const memId = req.params.memId;
  const bookshelfStatus = await bookshelfModel.find(memId);
  if (bookshelfStatus == undefined) {
    res.status(statusCode.OK).json({ code: 0, msg: '책장이 존재하지 않음' });
  } else {
    const bookshelf_id = bookshelfStatus.bookshelf_id;
    const booksInShelf = await bookshelfModel.getBooks(bookshelf_id);
    if (booksInShelf == undefined) {
      res
        .status(statusCode.OK)
        .json({ code: 1, msg: '책장에 책이 존재하지 않음' });
    } else {
      res.status(statusCode.OK).json({ code: 1, msg: '책장에 책이 존재함' });
    }
  }
};

exports.createShelf = async (req, res) => {
  const memId = req.memId;
  const createShelfStatus = await bookshelfModel.create(memId);
  if (createShelfStatus) {
    res.status(statusCode.OK).json({ code: 50, msg: '책장이 생성됨' });
  }
};

exports.addBook = async (req, res) => {
  const memId = req.params.memId;
  const book = JSON.parse(JSON.stringify(req.body));
  /* console.log(book);
  if (book.ISBN.indexOf(' ')) {
    console.log(book.ISBN.split(' ')[1]);
  }
  console.log(book); */
  //const ISBN = book.ISBN.split(' ')[1];
  const addBookStatus = await bookshelfModel.addBook(memId, book);
  if (addBookStatus) {
    if (addBookStatus == 53) {
      res
        .status(statusCode.OK)
        .json({ code: 53, msg: '이미 책장에 추가된 책은 또 추가할 수 없음' });
    } else {
      res.status(statusCode.OK).json({ code: 51, msg: '책 추가 됨' });
    }
  } else {
    res.status(statusCode.BAD_REQUEST).json({ code: 52, msg: '책 추가 실패' });
  }
};
