const express = require('express');
const router = express.Router();
const BookreportController = require('../controller/BookreportController');
const authUtil = require('../middlewares/auth').checkToken;

// create Book Report
router.post('/', authUtil, BookreportController.create);

// get Book Report list
router.get('/', authUtil, BookreportController.findAll);

// get One Report created
router.get('/:itemId', authUtil, BookreportController.findOne);

module.exports = router;
