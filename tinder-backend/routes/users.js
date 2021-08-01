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
    res.send('respond with a resource');
  },(err)=>next(err))
  .catch((err) => next(err));
});

router.post('/', (req, res, next) => {
  User.create(req.body)
  .then((user) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(user);
    res.send('respond with a resource');
  },(err)=>next(err))
  .catch((err) => next(err));
});

router.delete('/', (req, res, next) => {
  User.remove()
  .then((user) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(user);
    res.send('respond with a resource');
  },(err)=>next(err))
  .catch((err) => next(err));
});


module.exports = router;
