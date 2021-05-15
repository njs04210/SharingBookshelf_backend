const express = require('express');
const router = express.Router();
const BookController = require('../controller/BookController');
const authUtil = require('../middlewares/auth').checkToken;

//get Book
router.get('/:bookId', authUtil, BookController.getBook);

module.exports = router;
