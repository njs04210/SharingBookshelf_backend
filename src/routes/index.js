var express = require('express');
var router = express.Router();

router.post('/');
/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' }); //render() : view template 렌더링하는 함수. 여기선 index template 렌더링
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
