const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// routers
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const discoveryRouter = require('./routes/discovery');
const profileRouter = require('./routes/profile');

// utils
const response = require('../mockgram-utils/utils/response');
const authenticate = require('../mockgram-utils/utils/authenticate');
const config = require('../config');
require('../mockgram-utils/utils/modelMigration');

const app = express();

// set up mongoose connection
let mongoUrl = `mongodb://${config.mongoUrl.host}:${config.mongoUrl.port}/${config.mongoUrl.db}`;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.log('connected correctly to mongodb');
}).catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));

// adding a generic JSON and URL-encoded parser as a top-level middleware, 
// which will parse the bodies of all incoming requests.
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

// set up routers
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/discovery', discoveryRouter);
app.use('/profile', profileRouter);

// catch 404 and handle response
app.use(function (req, res, next) {
  return res.status(404).json({
    status: response.ERROR.NOT_FOUND.CODE,
    msg: response.ERROR.NOT_FOUND.MSG
  });
});

// catch 500 and handle response
app.use(function (err, req, res, next) {
  return res.status(500).json({
    status: response.ERROR.SERVER_ERROR.CODE,
    msg: response.ERROR.SERVER_ERROR.MSG,
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;