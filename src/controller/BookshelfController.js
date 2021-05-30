const bookshelfModel = require('../models/bookshelf');
const userModel = require('../models/user');
const statusCode = require('../modules/statusCode');

exports.getAllShelf = async (req, res) => {
  const memId = req.memId;
  var result = [];
  const allBookshelf = await bookshelfModel.findAll(memId);
  for (let i = 0; i < allBookshelf.length; i++) {
    var onePersonData = {};
    var memberData = {};
    const booksInShelf = await bookshelfModel.getBooks(
      allBookshelf[i].bookshelf_id
    );
    if (booksInShelf.length != 0) {
      const member = await userModel.find(allBookshelf[i].mem_id);
      var memberJson = JSON.parse(JSON.stringify(member));
      memberData.mem_id = memberJson.mem_id;
      memberData.photoURL = memberJson.photoURL;
      memberData.nickname = memberJson.nickname;

      onePersonData.member = memberData;
      onePersonData.hasBookList = booksInShelf;
      result.push(onePersonData);
    }
    if (i == allBookshelf.length - 1) {
      res
        .status(statusCode.OK)
        .json({ code: 60, msg: '회원의 모든 책장 가져오기', result: result });
    }
  }
};

exports.getShelf = async (req, res) => {
  const memId = req.params.memId;
  var category = req.query.category;
  const bookshelfStatus = await bookshelfModel.find(memId);
  var bookshelf_id, booksInShelf;

  if (category == undefined) {
    if (bookshelfStatus == undefined) {
      res.status(statusCode.OK).json({ code: 0, msg: '책장이 존재하지 않음' });
    } else {
      bookshelf_id = bookshelfStatus.bookshelf_id;
      booksInShelf = await bookshelfModel.getBooks(bookshelf_id);
      if (booksInShelf[0] == undefined) {
        res
          .status(statusCode.OK)
          .json({ code: 1, msg: '책장에 책이 존재하지 않음', hasBooks: null });
      } else {
        res
          .status(statusCode.OK)
          .json({ code: 1, msg: '책장에 책이 존재함', hasBooks: booksInShelf });
      }
    }
  } else {
    category = parseInt(req.query.category);

    if (bookshelfStatus == undefined) {
      res.status(statusCode.OK).json({ code: 0, msg: '책장이 존재하지 않음' });
    } else {
      bookshelf_id = bookshelfStatus.bookshelf_id;
      booksInShelf = await bookshelfModel.getBooksCategory(
        bookshelf_id,
        category
      );
      if (booksInShelf[0] == undefined) {
        res
          .status(statusCode.OK)
          .json({ code: 1, msg: '책장에 책이 존재하지 않음', hasBooks: null });
      } else {
        res
          .status(statusCode.OK)
          .json({ code: 1, msg: '책장에 책이 존재함', hasBooks: booksInShelf });
      }
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
