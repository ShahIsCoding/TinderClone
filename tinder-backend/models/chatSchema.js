const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

var chat = new Schema({
    chatroomId:{
        type:String,
        required:true
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

module.exports = mongoose.model('Chat',chat);
