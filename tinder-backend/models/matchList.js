const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const match = new Schema({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
});
const matchList = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    matches:[match]    
    },{
        timestamp:true
    });

const MatchList = new Schema('Matches',matchList);

module.exports = MatchList;