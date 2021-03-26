var express = require('express');
var db = require('../config/db');
var router = express.Router();
router.use(express.urlencoded({ extended: false })); //bodyParser 사용

/* GET users listing. */
router.get('/', function (req, res) {
  db.query(
    `SELECT * FROM member WHERE email=?`,
    [req.query.email],
    function (err, results) {
      if (err) {
        console.log(err);
      }
      res.json(results[0]);
    }
  );
});

/* 로그인, 회원가입 처리 => /api/members */
router.post('/', function (req, res) {
  var email = req.body.email;
  var name = req.body.name;
  var pwd = req.body.password;
  console.log(req);
  db.query(
    `SELECT * FROM member WHERE email = ?`,
    [email],
    function (err, results) {
      if (err) throw err;
      if (results[0] == undefined) {
        //member 테이블에 email없는 상태(undefined)면 insert
        db.query(
          `INSERT INTO member (email, name, password) VALUES (?, ?, ?)`,
          [email, name, pwd],
          function (err, results2) {
            if (err) throw err;
            console.log(results2[0]);
            res.status(201).json({
              code: 201,
              message: `새로운 회원 ${name}님, 환영합니다!`,
            });
            //res.send({ code: 200, message: `${name}님, 환영합니다!` });
          }
        );
      } else {
        //member 테이블에 이미 존재하는 회원일때. != undefined
        res.json({
          code: 200,
          message: `다시 찾아주신 ${name}님, 환영합니다!`,
        });
      }
    }
  );
});

module.exports = router;

/**
 * @swagger
 *   components:
 *     schemas:
 *      Members:
 *        type: object
 *        properties:
 *          code:
 *            type: integer
 *            description: 응답코드
 *          msg:
 *            type: string
 *            description: 응답메시지
 */

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API to manage Members
 */

/**
 * @swagger
 * /api/members:
 *   get:
 *     tags: [Members]
 *     summary: 유저 정보 가져오기
 *     responses:
 *       "200":
 *         description: 유저 정보 성공적으로 가져옴
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: 유저 이름
 *   post:
 *     tags: [Members]
 *     summary: 로그인 또는 회원가입
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 구글 이메일
 *               name:
 *                 type: string
 *                 description: 이름
 *               password:
 *                 type: string
 *                 description: 파이어베이스 구글 uid
 *     responses:
 *       "200":
 *         description: 기존회원 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Members'
 *       "201":
 *         description: 신규회원 가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Members'
 */
