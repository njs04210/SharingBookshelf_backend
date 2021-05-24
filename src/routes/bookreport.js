const express = require('express');
const router = express.Router();
const BookreportController = require('../controller/BookreportController');
const authUtil = require('../middlewares/auth').checkToken;

// create Book Report
router.post('/', authUtil, BookreportController.create);

module.exports = router;
