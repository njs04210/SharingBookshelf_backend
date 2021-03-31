var express = require('express');
var router = express.Router();

var UserController = require('../controller/UserController');

//Login
router.post('/', UserController.login);

module.exports = router;
