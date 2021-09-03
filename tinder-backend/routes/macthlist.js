var express = require('express');
var MatchList = require('../models/matchList');
var router = express.Router();
var isUser = require('../authentication').isUser;

router.route('/match')
.get(isUser,(req,res,next) =>{
    console.log(req.userId);
    MatchList.find({user:req.userId})
    .populate('user')
    .populate('likeSent')
    .populate('likeReceive')
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
        var idx = user.likeSent.indexOf(matchId);
        user.likeSent.splice(idx,1);
        idx = user.matches.indexOf(matchId);
        if(idx<0) {user.matches.push(matchId);}
        user.save();

        MatchList.findOne({user:matchId})
        .then((matchedUser) =>{
            var matchidx = matchedUser.likeRecieve.indexOf(userId);
            matchedUser.likeRecieve.splice(matchidx,1);
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
    .populate('likeSent')
    .populate('likeRecieve')
    .then((list) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json({sent:list[0].likeSent,receive:list[0].likeRecieve});
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
                createdUser.likeSent.push(matchId);
                createdUser.save();

                MatchList.findOne({user:matchId})
                .then((matchuser) => {
                    if(matchuser === null){
                        MatchList.create({user:matchId})
                        .then((createdMatchUser) => {
                            createdMatchUser.likeRecieve.push(userId);
                            createdMatchUser.save();
                        },err => next(err));
                    }
                    else{
                        if( (matchuser.likeRecieve.indexOf(userId)<0) && (matchuser.matches.indexOf(userId)<0) )
                            matchuser.likeRecieve.push(userId);
                            matchuser.save();
                    }
                },err => next(err))

            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(createdUser);
            },err => next(err))
        }
        else{
            if( (user.likeSent.indexOf(matchId)<0) && (user.matches.indexOf(matchId)<0) )
                user.likeSent.push(matchId);
                user.save();
            
                MatchList.findOne({user:matchId})
                .then((matchuser) => {
                    if(matchuser === null){
                        MatchList.create({user:matchId})
                        .then((createdMatchUser) => {
                            createdMatchUser.likeRecieve.push(userId);
                            createdMatchUser.save();
                        },err => next(err));
                    }
                    else{
                        if( (matchuser.likeRecieve.indexOf(userId)<0) && (matchuser.matches.indexOf(userId)<0) )
                            matchuser.likeRecieve.push(userId);
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

        var idx = user.likeRecieve.indexOf(matchId);
        user.likeRecieve.splice(idx,1);

        var idx = user.likeSent.indexOf(matchId);
        user.likeSent.splice(idx,1);

        user.save();
        MatchList.find({user:matchId})
        .then((matchedUser) =>{
            var idx = matchedUser.likeRecieve.indexOf(userId);
            matchedUser.likeRecieve.splice(idx,1);
            matchedUser.save();
        }, err => next(err));

        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(user);
    }, err => next(err))
    .catch((err) => next(err));
});

module.exports = router;