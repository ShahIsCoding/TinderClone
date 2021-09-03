const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

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
    matches:[{
        type: ObjectId,
        ref:'User'
    },{
        timestamp:true
    }]    
    
});

const MatchList = mongoose.model('Match',matchList);

module.exports = MatchList;