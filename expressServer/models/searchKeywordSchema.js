//searchKeywordSchema
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const metaSchema =  new Schema({
    name:{
        type:String,
        uppercase: false,
        unique:true
    },
    description: String,
    count:Number

},{ timestamps: true });

module.exports = mongoose.model("searchKeyword", metaSchema);