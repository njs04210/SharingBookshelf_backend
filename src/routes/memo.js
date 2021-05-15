const express = require('express');
const router = express.Router();
const MemoController = require('../controller/MemoController');
const authUtil = require('../middlewares/auth').checkToken;

// 메모 등록
router.patch('/', authUtil, MemoController.create);

// 메모 불러오기
router.get('/:bookId', authUtil, MemoController.find);

// 모든 메모 불러오기
router.get('/', authUtil, MemoController.findAll);

module.exports = router;
