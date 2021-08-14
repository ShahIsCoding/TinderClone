var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
require('dotenv').config();
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var matchRouter = require('./routes/macthlist');

const connection_url = 'mongodb://localhost:27017/tinderClone';
const connect = mongoose.connect(connection_url,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect.then((db) =>{
  console.log('Connected to database');
},(err) => next(err));


var app = express();

app.use(cors(['http://localhost:3000']));

app.use(session({
  name:'tinder-session',
  secret:process.env.session__SECRETKEY,
  resave:false,
  saveUninitialized:true,
  store:new FileStore(),
  cookie:{
      expires:1000 *60 *60 *24
    }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
require('./authentication');

app.use('/', indexRouter);
app.use('/matchlist',matchRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;