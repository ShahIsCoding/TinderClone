var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const connection_url = process.env.MONGODB_URL;
const connect = mongoose.connect(connection_url);

connect.then((db) =>{
  console.log('Connected to database');
},(err) => next(err));


var app = express();
app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(['http://localhost:3000']))
app.use(cookieParser('12345-67890-09876-54321'));

function auth(req,res,next){
  var authHeader = req.headers.authorization;
  if(!authHeader){
    var err = new Error('You are not Authenticated');
    res.setHeader('www-Authenticate','Basic');
    err.status = 401;
    next(err);
    return;
  }
  var auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
  var user = auth[0];
  var password = auth[1];
  
  if(user =='admin' && password=='password') {
    next();
  }
  else {
    var err = new Error('You are not Authenticated');
    res.setHeader('www-Authenticate','Basic');
    err.status = 401;
    next(err);
  }
};

// app.use(auth);
app.use('/', indexRouter);
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