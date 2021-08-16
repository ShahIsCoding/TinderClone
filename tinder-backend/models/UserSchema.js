var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        hash:{
            type:String,
        },
        salt:{
            type:String
        }
    },
    imgUrl:{
        type:String
    },
    age:{
        type:Number,
        required:true,
        min:16
    },
    gender:{
        type:String,
        required:true
    },
    place:{
        type:String,
    }
},{
    timestamp:true
});

const User = mongoose.model('User',UserSchema);
module.exports = User;