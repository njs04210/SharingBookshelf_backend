var express = require('express');
var db = require('../config/db');
var router = express.Router();
router.use(express.urlencoded({ extended: false })); //bodyParser 사용

/* GET users listing. */
router.get('/', function (req, res) {
  db.query(
    `SELECT * FROM member WHERE mem_id=?`,
    [req.query.id],
    function (error, results) {
      if (error) {
        console.log(error);
      }
      res.json(results[0]);
    }
  );
});

/* 회원가입 처리 => /user/join */
router.post('/join', function (req, res) {
  var email = req.body.email;
  var nickname = req.body.nickname;
  var pwd = req.body.password;
  db.query(
    `INSERT INTO member (email, nickname, password) VALUES (?, ?, ?)`,
    [email, nickname, pwd],
    function (error, results) {
      if (error) {
        console.log(results);
        res.send({ msg: '이미 존재하는 회원입니다.' });
      }
      console.log(results);
      res.send({ code: 200, message: `${nickname}님, 환영합니다!` });
    }
  );
});

module.exports = router;
