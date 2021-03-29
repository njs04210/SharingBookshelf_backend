var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { swaggerUi, specs } = require('./config/swagger');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(logger('dev')); //.use => 미들웨어 호출
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var oauthRouter = require('./routes/oauth');

app.use('/', indexRouter); // 경로 /로 시작하면 indexRouter라는 미들웨어 적용
app.use('/api/oauth', oauthRouter); //google token verify
app.use('/api/members', usersRouter); //users로 시작하는 path들에게 userRouter 미들웨어 적용
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); //swagger API 페이지

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
  //res.status(404).send('Sorry cant find that!');
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500); //status -> HTTP 응답코드 설정함수
  res.render('error');
});

module.exports = app;
