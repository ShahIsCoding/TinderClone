var express = require('express');
var MatchList = require('../models/matchList');
var router = express.Router();
var isUser = require('../authentication').isUser;

router.route('/match')
.get(isUser,(req,res,next) =>{
    console.log(req.userId);
    MatchList.find({user:req.userId})
    .populate('user')
    .populate('likes')
    .populate('matches')
    .then((list) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(list[0].matches);
    },(err)=> next(err))
    .catch((err)=> next(err))
})
.post(isUser,(req,res,next) =>{
    var userId  = req.userId;
    var matchId = req.body._id; 
    
    MatchList.findOne({user:userId})
    .then((user) =>{
        var idx = user.likes.indexOf(matchId);
        user.likes.splice(idx,1);
        idx = user.matches.indexOf(matchId);
        console.log(matchId,' ',idx);
        if(idx<0) {user.matches.push(matchId);}
        user.save();

        MatchList.findOne({user:matchId})
        .then((matchedUser) =>{
            var matchidx = matchedUser.likes.indexOf(userId);
            matchedUser.likes.splice(matchidx,1);
            if(matchedUser.matches.indexOf(userId)<0)
                matchedUser.matches.push(userId);
            matchedUser.save();
        },(err)=> next(err));


        MatchList.findOne({user:userId})
        .populate('matches')
        .then((usr) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.json(usr.matches);
        },err => next(err));        
    },(err)=> next(err))
    .catch((err)=> next(err))
})
.delete(isUser,(req,res,next) =>{
    var matchId = req.params.matchId;
    var userId = req.userId;
    MatchList.findOne({user:userId})
    .then((user) =>{
        idx = user.matches.indexOf(matchId);
        user.matches.splice(idx,1);
        user.save();

        MatchList.find({user:matchId})
        .then((matchedUser) =>{
            idx = matchedUser.matches.indexOf(userId);
            matchedUser.matches.splice(idx,1);
            matchedUser.save();
        }, err => next(err));
    }, err => next(err))
    .catch(err => next(err));
});
        


router.route('/likes')
.get(isUser,(req,res,next) =>{
    MatchList.find({user:req.userId})
    .populate('user')
    .populate('likes')
    .then((list) =>{
        var Likes = list[0].likes;
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(Likes);
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
                user.save();
            
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
});


router.route('/match/:matchId')
.delete(isUser,(req,res,next) =>{
    var matchId = req.params.matchId;
    var userId = req.userId;
    MatchList.findOne({user:userId})
    .then((user) =>{

        idx = user.matches.indexOf(matchId);
        user.matches.splice(idx,1);
        user.save();

        MatchList.find({user:matchId})
        .then((matchedUser) =>{
            idx = matchedUser.matches.indexOf(userId);
;           matchedUser.matches.splice(idx,1);
            matchedUser.save();
        }, err => next(err));

        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(user);
    }, err => next(err))
    .catch((err) => next(err));
});

router.route('/likes/:matchId')
.delete(isUser,(req,res,next) =>{
    var matchId = req.params.matchId;
    var userId = req.userId;
    MatchList.findOne({user:userId})
    .then((user) =>{

        var idx = user.likes.indexOf(matchId);
        user.likes.splice(idx,1);
        user.save();
        MatchList.find({user:matchId})
        .then((matchedUser) =>{
            var idx = matchedUser.likes.indexOf(userId);
            matchedUser.likes.splice(idx,1);
            matchedUser.save();
        }, err => next(err));

        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(user);
    }, err => next(err))
    .catch((err) => next(err));
});

module.exports = router;