const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const fileUpload = require('express-fileupload');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const profileRouter = require('./routes/profile');
const notificationsRouter = require('./routes/notifications');
const apiPostsRouter = require('./routes/posts');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/notifications', notificationsRouter);
app.use('/api/posts', apiPostsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log('Error: ' + err.message);
  // render the error page
  res.status(err.status || 500);
  res.json({success: false, message: err.message});
});

module.exports = app;
