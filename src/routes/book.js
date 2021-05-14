const express = require('express');
const router = express.Router();
const BookController = require('../controller/BookController');
const authUtil = require('../middlewares/auth').checkToken;

//get Book
router.get('/:isbn', authUtil, BookController.getBook);

module.exports = router;
