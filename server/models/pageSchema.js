const mongoose = require('mongoose');
const Schema = mongoose.Schema

const pageSchema =  new Schema({
    pageName:{
        type:String,
        unique:true
    },
    sidebar:Boolean,
    status: String,
    imageUrl:String,
});

module.exports = mongoose.model("page", pageSchema);