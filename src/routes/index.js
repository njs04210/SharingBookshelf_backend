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
 *      User:
 *        type: object
 *        properties:
 *          code:
 *            type: integer
 *            description: 응답코드
 *          message:
 *            type: string
 *            description: 응답메시지
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API to manage Users
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags: [User]
 *     summary: 로그인
 *     parameters:
 *     - name: googleToken
 *       in : header
 *       description: an authorization header
 *       required: true
 *       type: string
 *     responses:
 *       "200":
 *         description: JWT 정상 발급
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: 응답코드
 *                 message:
 *                   type: string
 *                   description: 응답메시지
 *                 flag:
 *                   type: integer
 *                   description: 0 = 신규회원, 1 = 기존회원
 *                 token:
 *                   type: string
 *                   description: 발급된 JWT
 *       "500":
 *         description: 서버 에러 - JWT 발급에러
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "403":
 *         description: Error Verifying Firebase user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
