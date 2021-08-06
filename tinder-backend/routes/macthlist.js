var express = require('express');
var MatchList = require('../models/matchList');
var router = express.Router();

router.get('/:userId',(req,res,next) =>{
    MatchList.find({user:req.params.userId})
    .then((list) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(list);
    },(err)=> next(err))
    .catch((err)=> next(err));
});

module.exports = router;