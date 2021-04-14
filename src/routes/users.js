const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const authUtil = require('../middlewares/auth').checkToken;

//Login
router.post('/', UserController.login);
//회원 자녀나이, 지역, 닉네임 등록
router.patch('/', authUtil, UserController.setInfo);
//회원 정보 가져오기
router.get('/:memId', authUtil, UserController.getInfo);

module.exports = router;
