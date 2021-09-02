var express = require('express');
var MatchList = require('../models/matchList');
var router = express.Router();
var isUser = require('../authentication').isUser;

router.route('/')
.get(isUser,(req,res,next) =>{
    console.log(req.userId);
    MatchList.find({user:req.userId})
    .populate('user')
    .populate('likes')
    .populate('matches')
    .then((list) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(list);
    },(err)=> next(err))
    .catch((err)=> next(err))
})
.post(isUser,(req,res,next) =>{
    var userId  = req.userId;
    var matchId = req.body._id; 
    MatchList.findOne({user:userId})
    .then((user) => {
        if(user === null){
            MatchList.create({user:userId})
            .then((createdUser) => {
                createdUser.likes.push(matchId);
                createdUser.save();

                MatchList.findOne({user:matchId})
                .then((matchuser) => {
                    if(matchuser === null){
                        MatchList.create({user:matchId})
                        .then((createdMatchUser) => {
                            createdMatchUser.likes.push(userId);
                            createdMatchUser.save();
                        },err => next(err));
                    }
                    else{
                        if( (matchuser.likes.indexOf(userId)<0) && (matchuser.matches.indexOf(userId)<0) )
                            matchuser.likes.push(userId);
                            matchuser.save();
                    }
                },err => next(err))

            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(createdUser);
            },err => next(err))
        }
        else{
            if( (user.likes.indexOf(matchId)<0) && (user.matches.indexOf(matchId)<0) )
                user.likes.push(matchId);
            
                MatchList.findOne({user:matchId})
                .then((matchuser) => {
                    if(matchuser === null){
                        MatchList.create({user:matchId})
                        .then((createdMatchUser) => {
                            createdMatchUser.likes.push(userId);
                            createdMatchUser.save();
                        },err => next(err));
                    }
                    else{
                        if( (matchuser.likes.indexOf(userId)<0) && (matchuser.matches.indexOf(userId)<0) )
                            matchuser.likes.push(userId);
                            matchuser.save();
                    }
                },err => next(err));
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(user);
        }
    },err => next(err))
    .catch(err => next(err))
})
// .post(isUser,(req,res,next) =>{
//     MatchList.findOne({user:req.userId})
//     .then((user) =>{
//         if(user === null) {     
//             MatchList.create({user:req.userId})
//             .then((user) =>{
//                 user.matches.push(req.body._id);
//                 user.save();
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type','application/json')
//                 res.json(user);    
//             },err => next(err))
//         }
//         else{
//             if(user.matches.indexOf(req.body._id)<0)
//                 user.matches.push(req.body._id);
//             user.save();
//             res.statusCode = 200;
//             res.setHeader('Content-Type','application/json')
//             res.json(user);
//         }
//     },(err)=> next(err))
//     .catch((err)=> next(err))
// })
.delete(isUser,(req,res,next) =>{
    MatchList.remove()
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(user);
    },(err) => next(err))
    .catch((err) => next(err));
});

router.route('/:matchId')
.delete(isUser,(req,res,next) =>{
    MatchList.findOne({user:req.userId})
    .then((user) =>{
        var idx = user.matches.indexOf(req.params.matchId);
        user.matches.splice(idx,1);
        user.save();
        MatchList.find({user:req.userId})
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