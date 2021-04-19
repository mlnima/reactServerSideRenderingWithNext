const mongoose = require('mongoose');
const Schema = mongoose.Schema

const pageSchema =  new Schema({
    pageName:{
        type:String,
        unique:true
    },
    sidebar:String,
    status: String,
    imageUrl:String,
    pageStyle:String
});

module.exports = mongoose.model("page", pageSchema);