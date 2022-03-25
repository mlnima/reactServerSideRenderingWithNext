const mongoose = require('mongoose');
const Schema = mongoose.Schema

const pageSchema =  new Schema({
    pageName:{
        type:String,
        unique:true
    },
    title:String,
    description:String,
    keywords:String,
    sidebar:String,
    status: String,
    imageUrl:String,
    translation:mongoose.Mixed,
    pageStyle:String
});

module.exports = mongoose.model("page", pageSchema);