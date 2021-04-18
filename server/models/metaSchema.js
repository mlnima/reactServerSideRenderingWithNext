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
    status: String,
    imageUrl:String,
    translations:mongoose.Mixed,
    count:Number,
    lastModify: {
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("meta", metaSchema);