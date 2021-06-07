var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' }); //render() : view template 렌더링하는 함수. 여기선 index template 렌더링
});

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API to manage Users
 * @swagger
 * tags:
 *   name: Bookshelf
 *   description: API to manage Bookshelf
 * @swagger
 * tags:
 *   name: Books
 *   description: API to manage books
 * @swagger
 * tags:
 *   name: Bookreports
 *   description: API to manage bookreports
 * @swagger
 * tags:
 *   name: Ranking
 *   description: API to manage ranking
 */

/**
 * @swagger
 * /api/users/{memId}:
 *   get:
 *     tags: [Users]
 *     summary: 특정회원 정보 받아오기
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
 *       required: true
 *       type: string
 *     responses:
 *       "200":
 *         description: 회원정보 정상적으로 가져옴
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 flag:
 *                   type: integer
 *                   description: 어따쓰지..
 *                 profileImg:
 *                   type: string
 *                   description: 프로필사진 URI
 *                 nickname:
 *                   type: string
 *                   description: 회원활동 닉네임
 *                 area:
 *                   type: string
 *                   description: 지역명
 *                 email:
 *                   type: string
 *                   description: 가입 이메일
 *                 name:
 *                   type: string
 *                   descripton: 이름
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [Users]
 *     summary: 로그인 및 회원가입
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
 *                 flag:
 *                   type: integer
 *                   description: 0 = 신규회원, 1 = 기존회원
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 *                 accessToken:
 *                   type: integer
 *                   description: 발급된 JWT
 *                 memId:
 *                   type: string
 *                   description: 회원고유id
 *       "403":
 *         description: Error Verifying Firebase user(Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */

/**
 * @swagger
 * /api/users:
 *   patch:
 *     tags: [Users]
 *     summary: 회원정보 업데이트
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
 *       required: true
 *       type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 description: 지역명
 *                 required: true
 *               nickname:
 *                 type: string
 *                 description: 활동 닉네임
 *                 required: true
 *               sex:
 *                 type : integer
 *                 description : 1 = 남자, 2 = 여자
 *                 required: true
 *               age:
 *                 type: string
 *                 description: 자녀 나이
 *                 required: true
 *               photoURL:
 *                 type: string
 *                 description: 프로필사진 URI. null일 경우 기본 로고
 *     responses:
 *       "200":
 *         description: 신규회원 (디테일)정보 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */

/**
 * @swagger
 * /api/users/{memId}/analysis:
 *   get:
 *     tags: [Users]
 *     summary: 회원 책장 분석
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
 *       required: true
 *       type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 description: 지역명
 *                 required: true
 *               nickname:
 *                 type: string
 *                 description: 활동 닉네임
 *                 required: true
 *               sex:
 *                 type : integer
 *                 description : 1 = 남자, 2 = 여자
 *                 required: true
 *               age:
 *                 type: string
 *                 description: 자녀 나이
 *                 required: true
 *               photoURL:
 *                 type: string
 *                 description: 프로필사진 URI. null일 경우 기본 로고
 *     responses:
 *       "200":
 *         description: 신규회원 (디테일)정보 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */

/**
 * @swagger
 * /api/bookshelvs:
 *   get:
 *     tags: [Bookshelf]
 *     summary: 회원 전체 모든 책장 불러오기
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
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
 *                   description: 61
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 *                 hasBooks:
 *                   type: string
 *                   description: 발급된 JWT
 *       "403":
 *         description: Error Verifying Firebase user(Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */

/**
 * @swagger
 * /api/bookshelvs/{memId}:
 *   get:
 *     tags: [Bookshelf]
 *     summary: 특정 회원의 모든 책장 불러오기
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
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
 *                 flag:
 *                   type: integer
 *                   description: 0 = 신규회원, 1 = 기존회원
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 *                 accessToken:
 *                   type: integer
 *                   description: 발급된 JWT
 *                 memId:
 *                   type: string
 *                   description: 회원고유id
 *       "403":
 *         description: Error Verifying Firebase user(Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */

/**
 * @swagger
 * /api/bookshelves/{memId}/bookreports:
 *   post:
 *     tags: [Bookshelf]
 *     summary: 다른 회원의 모든 독후감 불러오기
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
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
 *                 flag:
 *                   type: integer
 *                   description: 0 = 신규회원, 1 = 기존회원
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 *                 accessToken:
 *                   type: integer
 *                   description: 발급된 JWT
 *                 memId:
 *                   type: string
 *                   description: 회원고유id
 *       "403":
 *         description: Error Verifying Firebase user(Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */

/**
 * @swagger
 * /api/bookshelves/{memId}/bookreports/{itemId}:
 *   post:
 *     tags: [Bookshelf]
 *     summary: 다른 회원의 특정 독후감 불러오기
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
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
 *                 flag:
 *                   type: integer
 *                   description: 0 = 신규회원, 1 = 기존회원
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 *                 accessToken:
 *                   type: integer
 *                   description: 발급된 JWT
 *                 memId:
 *                   type: string
 *                   description: 회원고유id
 *       "403":
 *         description: Error Verifying Firebase user(Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */

/**
 * @swagger
 * /api/bookshelves:
 *   post:
 *     tags: [Bookshelf]
 *     summary: 책장 생성
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
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
 *                 flag:
 *                   type: integer
 *                   description: 0 = 신규회원, 1 = 기존회원
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 *                 accessToken:
 *                   type: integer
 *                   description: 발급된 JWT
 *                 memId:
 *                   type: string
 *                   description: 회원고유id
 *       "403":
 *         description: Error Verifying Firebase user(Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */

/**
 * @swagger
 * /api/books/{bookId}:
 *   get:
 *     tags: [Books]
 *     summary: 책장에 책 등록
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
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
 *                 flag:
 *                   type: integer
 *                   description: 0 = 신규회원, 1 = 기존회원
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 *                 accessToken:
 *                   type: integer
 *                   description: 발급된 JWT
 *                 memId:
 *                   type: string
 *                   description: 회원고유id
 *       "403":
 *         description: Error Verifying Firebase user(Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */

/**
 * @swagger
 * /api/bookshelves/{memId}:
 *   post:
 *     tags: [Bookshelf]
 *     summary: 책장에 책 등록
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
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
 *                 flag:
 *                   type: integer
 *                   description: 0 = 신규회원, 1 = 기존회원
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 *                 accessToken:
 *                   type: integer
 *                   description: 발급된 JWT
 *                 memId:
 *                   type: string
 *                   description: 회원고유id
 *       "403":
 *         description: Error Verifying Firebase user(Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */

/**
 * @swagger
 * /api/bookreports:
 *   get:
 *     tags: [Bookreports]
 *     summary: 모든 독후감 불러오기
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
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
 *                 flag:
 *                   type: integer
 *                   description: 0 = 신규회원, 1 = 기존회원
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 *                 accessToken:
 *                   type: integer
 *                   description: 발급된 JWT
 *                 memId:
 *                   type: string
 *                   description: 회원고유id
 *       "403":
 *         description: Error Verifying Firebase user(Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */

/**
 * @swagger
 * /api/bookreports/{itemId}:
 *   get:
 *     tags: [Bookreports]
 *     summary: 특정 독후감 불러오기
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
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
 *                 flag:
 *                   type: integer
 *                   description: 0 = 신규회원, 1 = 기존회원
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 *                 accessToken:
 *                   type: integer
 *                   description: 발급된 JWT
 *                 memId:
 *                   type: string
 *                   description: 회원고유id
 *       "403":
 *         description: Error Verifying Firebase user(Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */

/**
 * @swagger
 * /api/bookreports:
 *   post:
 *     tags: [Bookreports]
 *     summary: 독후감 등록
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
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
 *                 flag:
 *                   type: integer
 *                   description: 0 = 신규회원, 1 = 기존회원
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 *                 accessToken:
 *                   type: integer
 *                   description: 발급된 JWT
 *                 memId:
 *                   type: string
 *                   description: 회원고유id
 *       "403":
 *         description: Error Verifying Firebase user(Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */

/**
 * @swagger
 * /api/{bookreports}:
 *   post:
 *     tags: [Bookreports]
 *     summary: 독후감 등록
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
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
 *                 flag:
 *                   type: integer
 *                   description: 0 = 신규회원, 1 = 기존회원
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 *                 accessToken:
 *                   type: integer
 *                   description: 발급된 JWT
 *                 memId:
 *                   type: string
 *                   description: 회원고유id
 *       "403":
 *         description: Error Verifying Firebase user(Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */

/**
 * @swagger
 * /api/ranking/books:
 *   get:
 *     tags: [Ranking]
 *     summary: 도서랭킹
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
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
 *                 flag:
 *                   type: integer
 *                   description: 0 = 신규회원, 1 = 기존회원
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 *                 accessToken:
 *                   type: integer
 *                   description: 발급된 JWT
 *                 memId:
 *                   type: string
 *                   description: 회원고유id
 *       "403":
 *         description: Error Verifying Firebase user(Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */

/**
 * @swagger
 * /api/ranking/bookreports:
 *   get:
 *     tags: [Ranking]
 *     summary: 독후감 랭킹
 *     parameters:
 *     - name: accessToken(JWT)
 *       in : header
 *       description: 어플 자체적으로 발급한 accessToken
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
 *                 flag:
 *                   type: integer
 *                   description: 0 = 신규회원, 1 = 기존회원
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 *                 accessToken:
 *                   type: integer
 *                   description: 발급된 JWT
 *                 memId:
 *                   type: string
 *                   description: 회원고유id
 *       "403":
 *         description: Error Verifying Firebase user(Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 응답메시지
 */
