const express = require('express');
const router = express.Router();
const BookshelfController = require('../controller/BookshelfController');
const BookreportController = require('../controller/BookreportController');
const authUtil = require('../middlewares/auth').checkToken;

//get All Bookshelf
router.get('/', authUtil, BookshelfController.getAllShelf);

//create BookShelf
router.post('/', authUtil, BookshelfController.createShelf);

//get Bookshelf
router.get('/:memId', authUtil, BookshelfController.getShelf);

//add Book in BookShelf
router.post('/:memId', authUtil, BookshelfController.addBook);

// get OtherBookshelf's All Bookreports
router.get('/:memId/bookreports', authUtil, BookreportController.findAll);

// get OtherBookshelf's One Bookreport
router.get(
  '/:memId/bookreports/:itemId',
  authUtil,
  BookreportController.findOne
);

module.exports = router;
