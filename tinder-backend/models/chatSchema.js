const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

var chatroom = new Schema({
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
