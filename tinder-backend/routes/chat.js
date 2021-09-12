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

chatRouter.route('/:chatroomId')
.get(isUser,(req,res,next) =>{
    var chatroomId = req.params.chatroomId;
    Chat.findById(chatroomId)
    .then(chat => {

        var Chat = chat.messages.map(c => {
            return{
            message:c.message,
            sender:(c.sender == req.userId),
            TOC:c.TOC
            }
        });
        res.statusCode = 200 ;
        res.setHeader('Content-Type','application/json');
        res.json(Chat);
    })
})
.post(isUser,(req,res,next) =>{
    var chatroomId = req.params.chatroomId;
    var message    = req.body.message;
    var sender     = req.userId;
    Chat.findById(chatroomId)
    .then(chat =>{
        chat.messages.push({
            message:message,
            sender:sender,
            TOC:new Date
        });
        chat.save();
        res.statusCode = 200 ;
        res.setHeader('Content-Type','application/json');
        res.json(chat);
    }, err => next(err))
    .catch(err => next(err));
})
module.exports = chatRouter;