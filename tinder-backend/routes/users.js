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
.delete((req, res, next) => {
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
.get((req,res,next) =>{
    User.findOne({email:req.params.emailId})
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(user);
    },(err)=> next(err))
    .catch((err) => next(err));
})
.delete((req,res,next)=>{
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
        req.session.user = user;        
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(user);
      },(err) => next(err))
    }
    else{
    res.statusCode = 400;
    res.send('User Already exists');}
  },(err) => next(err))  
  .catch((err) => next(err));
});

userRouter.post('/signin',(req,res,next) =>{
  passport.authenticate('local',(err,user,info) =>{
    console.log(err,user,info);
    if(err) next(err);
    if(!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type','application/json');
      res.json({success:false,status:'LogIn Failure'});
    }
    req.session.user = 'Authenticated';
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({success:true,status:'LogIn Succes',user:user});  
  })(req,res,next);
});
userRouter.get('/logout',(req,res,next) =>{
  if(req.session){
    console.log(req.session);
    req.session.user = null;
    req.session.destroy();
    res.clearCookie('tinder-session');
    res.redirect('/');
  }
  else{
    var err = new Error('You are not logged In!');
    err.status = 403;
    next(err);
  }
});

module.exports = userRouter;