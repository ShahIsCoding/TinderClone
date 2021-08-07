var express = require('express');
var Cards = require('../models/dbCards');
var router = express.Router();

router.route('/')
.get((req,res,next) =>{
    Cards.find({})
    .then((cards) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(cards);
    },(err)=> next(err))
    .catch((err)=> next(err));
})
.delete((req,res,next)=>{
    Cards.remove({})
    .then((cards) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(cards);
    },(err)=> next(err))
    .catch((err)=> next(err));
});

module.exports = router;