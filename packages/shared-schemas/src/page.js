const mongoose = require('mongoose');

const PageSchema =  new mongoose.Schema({
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
    translation:mongoose.Schema.Types.Mixed,
    pageStyle:String
}, {timestamps: true});

module.exports = mongoose.model("page", PageSchema);