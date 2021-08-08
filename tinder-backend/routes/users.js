var express = require('express');
var User = require('../models/UserSchema');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({})
  .then((user) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(user);
  },(err)=>next(err))
  .catch((err) => next(err));
})
.post('/', (req, res, next) => {
  User.findOne({email:req.body.email})
  .then((user) => {
    console.log(JSON.stringify( user));
    if(user===null){
      User.create(req.body)
      .then((user) =>{
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
})
.delete('/', (req, res, next) => {
  User.remove()
  .then((user) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(user);
  },(err)=>next(err))
  .catch((err) => next(err));
});

router.get('/:emailId',(req,res,next) =>{
    User.findOne({email:req.params.emailId})
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(user);
    },(err)=> next(err))
    .catch((err) => next(err));
});

module.exports = router;
