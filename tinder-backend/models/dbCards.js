var  mongoose = require ('mongoose');

const cardSchema = mongoose.Schema({
    name:String,
    imgUrl:String
},{
    timestamp:true
});

var Cards = mongoose.model('cards',cardSchema);
module.exports =  Cards;