const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

var match = new Schema({
        match:{
            type: ObjectId,
            ref:'User'
        },
        chatroom:{
            type:ObjectId,
            ref:'Chatroom'
        }
    });
const matchList = new Schema({
    user:{
        type: ObjectId,
        ref:'User'
    },
    likeSent:[
        {
            type: ObjectId,
            ref:'User'   
        },{
            timestamp:true
        }
    ],
    likeRecieve:[
        {
            type: ObjectId,
            ref:'User'   
        },{
            timestamp:true
        }
    ],
    matches:[match]    
},{
    timestamp:true
});

const MatchList = mongoose.model('Match',matchList);

module.exports = MatchList;