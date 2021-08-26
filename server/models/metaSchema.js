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
    additionalInfo:mongoose.Mixed

},{ timestamps: true });

module.exports = mongoose.model("meta", metaSchema);