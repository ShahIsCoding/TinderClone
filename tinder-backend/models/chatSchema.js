const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

var chatroom = new Schema({
    user1:{
        type:ObjectId,
        ref:'User'
    },
    user2:{
        type:ObjectId,
        ref:'User'
    },
    messages:[{
        sender:{
            type:ObjectId,
            ref:'User'
        },
        message:{
            type:String,
            required:true
        },
        TOC:{
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('Chatroom',chatroom);
