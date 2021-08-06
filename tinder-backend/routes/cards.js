var express = require('express');
var Cards = require('../models/dbCards');
var router = express.Router();

router.get('/',(req,res,next) =>{
    Cards.find({})
    .then((cards) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(cards);
    },(err)=> next(err))
    .catch((err)=> next(err));
});

module.exports = router;