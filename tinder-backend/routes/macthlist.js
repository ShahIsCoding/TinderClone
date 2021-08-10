var express = require('express');
var MatchList = require('../models/matchList');
var router = express.Router();

router.route('/:userId')
.get((req,res,next) =>{
    MatchList.find({user:req.params.userId})
    .populate('user')
    .populate('matches')
    .then((list) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(list);
    },(err)=> next(err))
    .catch((err)=> next(err))
})
.post((req,res,next) =>{
    MatchList.findOne({user:req.params.userId})
    .then((user) =>{
        if(user === null) {     
            MatchList.create({user:req.params.userId})
            .then((user) =>{
                user.matches.push(req.body._id);
                user.save();
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json(user);    
            },err => next(err))
        }
        else{
            user.matches.push(req.body._id);
            user.save();
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.json(user);
        }
    },(err)=> next(err))
    .catch((err)=> next(err))
})
.delete((req,res,next) =>{
    MatchList.remove()
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(user);
    },(err) => next(err))
    .catch((err) => next(err));
});

router.route('/:userId/:matchId')
.delete((req,res,next) =>{
    MatchList.findOne({user:req.params.userId})
    .then((user) =>{
        var idx = user.matches.indexOf(req.params.matchId);
        user.matches.splice(idx,1);
        user.save();
        MatchList.find({user:req.params.userId})
        .populate('user')
        .populate('matches')
        .then((list) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(list);
        })
    }, err => next(err))
    .catch((err) => next(err));
});

module.exports = router;