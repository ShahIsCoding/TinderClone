var express = require('express');
var userRouter = express.Router();

var User = require('../models/UserSchema');
var MatchList = require('../models/matchList');
var genPassword = require('../lib/passwordsUtils').genPassword;
var passport = require('passport');
var isUser = require('../authentication').isUser;
var getJwt__token = require('../authentication').getJwt__token;
require('dotenv').config();

/* GET users listing. */

userRouter.route('/')
.get(isUser,(req,res,next) =>{
  let matches = [] ;
  MatchList.findOne({user:req.userId})
  .then((match) =>{
    console.log("__________________matches___________",match);
    if(match !== null)
    {match.matches.map(m => matches.push(m));
    match.likeSent.map(m => matches.push(m));}
    matches.push(req.userId);
    User.find({_id:{$nin:matches}})
    .then((user)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(user);  
    })
  }, err=> next(err) )
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
userRouter.route('/user')
.get(isUser,(req,res,next) =>{
    User.findOne({_id:req.userId})
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(user);
    },(err)=> next(err))
    .catch((err) => next(err));
})
.delete(isUser,(req,res,next)=>{
  User.findOneAndDelete({_id:req.userId})
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
        var token  = getJwt__token(user._id);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.cookie('token',token,{httpOnly:true});
        res.json(user);
      },(err) => next(err))
      .catch((err) => next(err));
    }
    else{
      res.statusCode = 400;
      res.setHeader('Content-Type','application/json');
      res.json({err:'User Already exists'});
    }
  },(err) => next(err))  
  .catch((err) => next(err));
});

userRouter.post('/signin',(req,res,next) =>{
  passport.authenticate('local',(err,user,info) =>{
    if(user) {
      console.log(req.user);
      var token  = getJwt__token(user._id);
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.cookie('token',token,{httpOnly:true});
      res.json(user);  
    }
    else{
      res.clearCookie('token');
      res.statusCode = 401;
      res.setHeader('Content-Type','application/json');
      res.json({auth:false,user:user});
    }
  })(req,res,next);
});

userRouter.get('/logout',isUser,(req,res,next) =>{
    res.clearCookie('token', {httpOnly:true});
    res.status(200)
    res.setHeader('Content-Type','application/json');
    res.json({message:'You are Logged Out'});
});

module.exports = userRouter;