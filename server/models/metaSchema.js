//settingSchema
const mongoose = require('mongoose');

const metaSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    type: String,
    description: String,
    imageUrl:String
});

module.exports = mongoose.model("meta", metaSchema);