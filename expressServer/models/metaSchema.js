//settingSchema
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const metaSchema =  new Schema({
    name:{
        type:String,
        uppercase: false,
    },
    type: String,
    index:Number,
    description: String,
    status: {
        type:String,
        uppercase: false,
    },
    imageUrl:String,
    coverImageUrl:String,
    imageUrlLock:Boolean,
    translations:mongoose.Mixed,
    count:Number,
    likes:Number,
    views:Number,
    rank:Number,
    additionalInfo:mongoose.Mixed

},{ timestamps: true });

module.exports = mongoose.model("meta", metaSchema);