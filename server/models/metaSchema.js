//settingSchema
const mongoose = require('mongoose');

const metaSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    type: String,
    description: String,
    imageUrl:String,
    count:Number
});

module.exports = mongoose.model("metas", metaSchema);