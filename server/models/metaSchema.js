//settingSchema
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const metaSchema =  new Schema({
    name:{
        type:String,
        unique:true
    },
    type: String,
    description: String,
    imageUrl:String,
    count:Number
});

module.exports = mongoose.model("meta", metaSchema);