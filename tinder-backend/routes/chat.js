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

module.exports = chatRouter;