var express = require('express');
var MatchList = require('../models/matchList');
var Chatroom = require('../models/chatSchema');
var router = express.Router();
var isUser = require('../authentication').isUser;

router.route('/match')
.get(isUser,(req,res,next) =>{
    MatchList.find({user:req.userId})
    .populate('matches.match')
    .then((list) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        var matchlist = list[0].matches.map(m => {
            return{
            matchId:m.match._id,
            name:m.match.firstname+' '+m.match.lastname,
            imgUrl:m.match.imgUrl,
            chatroomId:m.chatroom
            }
        });
        res.json(matchlist);
    },(err)=> next(err))
    .catch((err)=> next(err))
})
.post(isUser,(req,res,next) =>{
    var userId  = req.userId;
    var matchId = req.body._id;
    Chatroom.create({user1:userId,user2:matchId})
    .then(chat => {

       MatchList.findOne({user:userId})
        .then((user) =>{
            var idx = user.likeSent.indexOf(matchId);
            if(idx >=0) user.likeSent.splice(idx,1);
            var idx = user.likeRecieve.indexOf(matchId);
            if(idx >=0) user.likeRecieve.splice(idx,1);

            idx = user.matches.filter(m =>m.match == matchId);
            if(idx.length == 0){
                user.matches.push({match:matchId,chatroom:chat._id});
            }else{
            idx = idx[0].match == matchId;
            if(!idx) {user.matches.push({match:matchId,chatroom:chat._id});}
            }
            user.save();
        },(err)=> next(err));

        MatchList.findOne({user:matchId})
        .then((matchedUser) =>{
            var matchidx = matchedUser.likeSent.indexOf(userId);
            if(matchidx >=0 ) matchedUser.likeSent.splice(matchidx,1);
            
            var matchidx = matchedUser.likeRecieve.indexOf(userId);
            if(matchidx >=0 ) matchedUser.likeRecieve.splice(matchidx,1);
            matchidx = matchedUser.matches.filter(m => m.match == userId);
            if(matchidx.length == 0){
                matchedUser.matches.push({match:userId,chatroom:chat._id});
            }else{
                matchidx = matchidx[0].match == userId;
                if(!matchidx) matchedUser.matches.push({match:userId,chatroom:chat._id});
            }
            matchedUser.save();
        },(err)=> next(err));

    },(err)=> next(err));

    MatchList.findOne({user:userId})
    .populate('matches.match')
    .then((usr) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(usr.matches);
    },err => next(err))
    .catch((err)=> next(err))
});

router.route('/likes')
.get(isUser,(req,res,next) =>{
    MatchList.find({user:req.userId})
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
            if(user.likeRecieve.indexOf(matchId)>=0){
                user.likeRecieve.splice(user.likeRecieve.indexOf(matchId),1);
                user.matches.push(matchId);
                user.save();

                MatchList.findOne({user:matchId})
                .then((matchuser) => {
                    matchuser.likeSent.splice(user.likeSent.indexOf(matchId),1);
                    matchuser.matches.push(matchId);
                    matchuser.save();
                },err => next(err));
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(user);
            }
            if( user.likeSent.indexOf(matchId)<0 )
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

        
        var idx = user.matches.filter(m => m.match != matchId);
        user.matches = idx;
        user.save();

        var chatid = user.matches.filter(m => m.match == matchId);
        if(chatid.length > 0){
            chatid = chatid[0].chatroom;
            Chatroom.findByIdAndDelete(chatid)
            .then(resp => console.log(resp),err => next(err));
        }

        MatchList.findOne({user:matchId})
        .then((matchedUser) =>{

            var matchidx = matchedUser.matches.filter(m => m.match != userId);
            matchedUser = matchidx;
            matchedUser.save();

        }, err => next(err));

        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(user);
    }, err => next(err))
    .catch((err) => next(err));
});

router.route('/likesent/:matchId')
.delete(isUser,(req,res,next) =>{
    var matchId = req.params.matchId;
    var userId = req.userId;
    MatchList.findOne({user:userId})
    .then((user) =>{

        var idx = user.likeSent.indexOf(matchId);
        user.likeSent.splice(idx,1);
        user.save();
        MatchList.find({user:matchId})
        .then((matchedUser) =>{
            var idx = matchedUser.likeRecieve.indexOf(userId);
            if(idx>=0) matchedUser.likeRecieve.splice(idx,1);
            matchedUser.save();
        }, err => next(err));

        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(user);
    }, err => next(err))
    .catch((err) => next(err));
});
router.route('/likesRecieve/:matchId')
.delete(isUser,(req,res,next) =>{
    var matchId = req.params.matchId;
    var userId = req.userId;
    MatchList.findOne({user:userId})
    .then((user) =>{

        var idx = user.likeRecieve.indexOf(matchId);
        user.likeRecieve.splice(idx,1);

        user.save();
        MatchList.find({user:matchId})
        .then((matchedUser) =>{
            var idx = matchedUser.likeSent.indexOf(userId);
            if(idx>=0) matchedUser.likeSent.splice(idx,1);
            matchedUser.save();
        }, err => next(err));

        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(user);
    }, err => next(err))
    .catch((err) => next(err));
});

router.route('/all')
.get(isUser,(req,res,next) =>{
    MatchList.find({user:req.userId})
    .populate('user')
    .populate('likeSent')
    .populate('likeRecieve')
    .populate('matches.match')
    .then((match) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(match);
    },err => next(err))
    .catch(err => next(err));
})
.delete(isUser,(req,res,next) =>{
    MatchList.remove()
    .then((resp) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },err => next(err))
    .catch(err => next(err));
});
module.exports = router;