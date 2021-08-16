var express = require('express');
var userRouter = express.Router();

var User = require('../models/UserSchema');
var genPassword = require('../lib/passwordsUtils').genPassword;
var passport = require('passport');
var isUser = require('../authentication').isUser;

/* GET users listing. */
userRouter.route('/')
.get(isUser,(req, res, next) => {
  User.find({})
  .then((user) =>{
    res.stusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(user);
  },(err)=>next(err))
  .catch((err) => next(err));
})
.delete(isUser,(req, res, next) => {
  User.remove()
  .then((user) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(user);
  },(err)=>next(err))
  .catch((err) => next(err));
});

// /:EMAILID
userRouter.route('/:emailId')
.get(isUser,(req,res,next) =>{
    User.findOne({email:req.params.emailId})
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(user);
    },(err)=> next(err))
    .catch((err) => next(err));
})
.delete(isUser,(req,res,next)=>{
  User.findOneAndDelete({email:req.params.emailId})
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({user:user,Message:'User has been deleted'});
  },(err)=> next(err))
  .catch((err) => next(err));
});

userRouter.post('/register',(req,res,next) =>{
  User.findOne({email:req.body.email})
  .then((user) => {
    if(user === null){
      var SaltHash = genPassword(req.body.password);
      var salt = SaltHash.salt;
      var hash = SaltHash.hash;
      req.body.password ={
        salt:salt,
        hash:hash
      };
      User.create(req.body)
      .then((user) =>{
        req.session.user = 'authorized';        
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(user);
      },(err) => next(err))
    }
    else{
      res.statusCode = 400;
      res.send('User Already exists');
    }
  },(err) => next(err))  
  .catch((err) => next(err));
});

userRouter.post('/signin',(req,res,next) =>{
  passport.authenticate('local',(err,user,info) =>{
    if(user) {
      req.session.user = 'authorized';
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(user);  
    }
    else{
      res.clearCookie('tinder-session');
      req.session.destroy();
      res.statusCode = 401;
      res.setHeader('Content-Type','application/json');
      res.json(user);
    }
  })(req,res,next);
});

userRouter.get('/logout',isUser,(req,res,next) =>{
    req.session.destroy();
    res.clearCookie();
});

module.exports = userRouter;