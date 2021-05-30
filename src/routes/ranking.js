const express = require('express');
const router = express.Router();
const RankingController = require('../controller/RankingController');
const authUtil = require('../middlewares/auth').checkToken;

//get Ranking
router.get('/', authUtil, RankingController.get);

//get Ranking of Bookreports
router.get('/bookreports', authUtil, RankingController.getReportsRanking);

module.exports = router;
