const db = require('../config/db');
const Promise = require('es6-promise').Promise;

exports.find = function (memId) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * from Bookshelf WHERE mem_id = ?`,
      [memId],
      function (err, res) {
        if (err) reject(err);
        else resolve(res[0]);
      }
    );
  });
};

exports.getBooks = function (bookshelf_id) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT book_id from Bookshelf_item WHERE bookshelf_id = ?`,
      [bookshelf_id],
      function (err, res) {
        if (err) reject(err);
        else if (res[0] == undefined) {
          //책장에 책이 없는 경우
          resolve(res);
        } else {
          var booklist = new Array();
          const books_id = JSON.parse(JSON.stringify(res));
          books_id.forEach(function (element) {
            booklist.push(element['book_id']);
          });

          var JsonArray = new Array();
          for (let i = 0; i < booklist.length; i++) {
            var book_id = booklist[i];
            db.query(
              `SELECT * FROM Book WHERE book_id = ?`,
              [book_id],
              function (err, res) {
                if (err) reject(err);
                else {
                  var book_info = JSON.stringify(res[0]);
                  JsonArray.push(JSON.parse(book_info));
                  if (i == booklist.length - 1) {
                    resolve(JsonArray);
                  }
                }
              }
            );
          }
        }
      }
    );
  });
};

exports.create = function (memId) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO Bookshelf (mem_id) VALUES (?)`,
      [memId],
      function (err, res) {
        if (err) reject(err);
        else {
          resolve(res);
        }
      }
    );
  });
};

exports.addBook = function (memId, book) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT bookshelf_id FROM Bookshelf WHERE mem_id = ?`,
      [memId],
      function (err, res) {
        if (err) reject(err);
        else {
          const bookshelf_id = res[0].bookshelf_id;
          let ISBN = book.ISBN;
          if (book.ISBN.indexOf(' ')) {
            ISBN = book.ISBN.split(' ')[1];
          }
          db.query(
            `SELECT book_id FROM Book WHERE ISBN = ?`,
            [ISBN],
            function (err, res) {
              if (err) reject(err);
              else {
                if (res[0] == undefined) {
                  db.query(
                    `INSERT INTO Book (ISBN, title, author, publisher, thumbnail) VALUES (?,?,?,?,?)`,
                    [
                      ISBN,
                      book.title,
                      book.author,
                      book.publisher,
                      book.thumbnail,
                    ],
                    function (err) {
                      if (err) reject(err);
                      else {
                        db.query(
                          `SELECT book_id FROM Book WHERE ISBN = ?`,
                          [ISBN],
                          function (err, res) {
                            if (err) reject(err);
                            else {
                              const book_id = res[0].book_id;
                              db.query(
                                `INSERT INTO Bookshelf_item (bookshelf_id, book_id) VALUES (?,?)`,
                                [bookshelf_id, book_id],
                                function (err) {
                                  if (err) reject(err);
                                  else {
                                    db.query(
                                      `INSERT INTO Memo (mem_id, ISBN) VALUES (?,?)`,
                                      [memId, ISBN],
                                      function (err, res) {
                                        if (err) reject(err);
                                        else resolve(res);
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                } else {
                  const book_id = res[0].book_id;
                  db.query(
                    `SELECT * FROM Bookshelf_item WHERE bookshelf_id = ? AND book_id = ?`,
                    [bookshelf_id, book_id],
                    function (err, res) {
                      if (err) reject(err);
                      else {
                        if (res[0] == undefined) {
                          db.query(
                            `INSERT INTO Bookshelf_item (bookshelf_id, book_id) VALUES (?,?)`,
                            [bookshelf_id, book_id],
                            function (err) {
                              if (err) reject(err);
                              else {
                                db.query(
                                  `INSERT INTO Memo (mem_id, ISBN) VALUES (?,?)`,
                                  [memId, ISBN],
                                  function (err, res) {
                                    if (err) reject(err);
                                    else resolve(res);
                                  }
                                );
                              }
                            }
                          );
                        } else {
                          resolve(53);
                        }
                      }
                    }
                  );
                }
              }
            }
          );
        }
      }
    );
  });
};
