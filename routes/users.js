var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* // define the about route -> :3000/users/about 으로 라우팅
router.get('/about', function (req, res) {
  res.send('About birds');
}); */

module.exports = router;
