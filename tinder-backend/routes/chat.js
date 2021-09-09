const express = require('express');
const chatRouter = express.Router();
const Chat = require('../models/chatSchema');
var isUser = require('../authentication').isUser;

chatRouter.route('/')
.get(isUser,(req,res,next)=>{
    Chat.find({})
    .populate('user1')
    .populate('user2')
    .then((chat) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(chat);
    },err => next(err))
    .catch((err)=> next(err))
})
.delete(isUser,(req,res,next)=>{
    Chat.remove({})
    .then((chat) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(chat);
    },err => next(err))
    .catch((err)=> next(err))
});
chatRouter.route('/:matchId')
.get(isUser,(req,res,next)=>{
    Chat.find({chatroomId:req.userId+''+req.params.matchId})
    .then((chat) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(chat);
    },err => next(err))
    .catch((err)=> next(err))
})
.post(isUser,(req,res,next)=>{
    Chat.findOne({chatroomId:req.userId+' '+req.params.matchId})
    .then((chat) =>{
        var classId = req.userId+' '+req.params.matchId;
        var message = req.body.message;
        var sender  = req.userId;
        if(chat === null){
            Chat.create({
                chatroomId:classId,
                messages:{
                    message:message,
                    sender:sender
                }})
            .then((chat) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(chat);
            }, err => next(err) )
        }
        else{
            chat.messages.push({
                message:message,
                sender:sender
            });
            chat.save();
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(chat);
        }
    },err => next(err))
    .catch(err=> next(err))
})
.delete(isUser,(req,res,next)=>{
    Chat.remove({})
        .then(resp =>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        },err => next(err))
        .catch(err => next(err));
})
module.exports = chatRouter;