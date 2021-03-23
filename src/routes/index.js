var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' }); //render() : view template 렌더링하는 함수. 여기선 index template 렌더링
});

module.exports = router;
