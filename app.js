const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const db = require('./db/pool');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const passport = require('passport');

const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

const app = express();

// view engine setup
// app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(
  expressSession({
    store: new pgSession({
      pool: db,
      createTableIfMissing: true,
      tableName: 'user_sessions',
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/passport');

app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/posts', postRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
