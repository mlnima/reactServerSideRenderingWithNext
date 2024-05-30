const mongoose = require('mongoose');

const SearchKeywordSchema =  new mongoose.Schema({
    name:{
        type:String,
        uppercase: false,
        unique:true
    },
    count:Number,
    searchHits:Number

},{ timestamps: true });

module.exports = mongoose.model("searchKeyword", SearchKeywordSchema);