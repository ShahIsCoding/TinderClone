var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
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

var User = mongoose.model('User',UserSchema);
module.exports = User;