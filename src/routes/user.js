const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

//Login
router.post('/', UserController.login);

module.exports = router;
