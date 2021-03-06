const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const { swaggerUi, specs } = require('./config/swagger'); // Swagger사용
const app = express(); // express configuration

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// print the request log on console
app.use(logger('dev'));

// parse JSON and url-encoded query
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 정적파일 경로
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('public'));

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const bookshelfRouter = require('./routes/bookshelf');
const bookRouter = require('./routes/book');
const memoRouter = require('./routes/memo');
const bookreportsRouter = require('./routes/bookreport');
const rankingRouter = require('./routes/ranking');

app.use('/', indexRouter); // 경로 /로 시작하면 indexRouter라는 미들웨어 적용
app.use('/api/users', userRouter);
app.use('/api/bookshelves', bookshelfRouter);
app.use('/api/books', bookRouter);
app.use('/api/memo', memoRouter);
app.use('/api/bookreports', bookreportsRouter);
app.use('/api/ranking', rankingRouter);

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
