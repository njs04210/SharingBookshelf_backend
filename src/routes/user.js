const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

//Login
router.post('/', UserController.login);
//회원 자녀나이, 지역, 닉네임 등록
router.patch('/', UserController.setInfo);

module.exports = router;
