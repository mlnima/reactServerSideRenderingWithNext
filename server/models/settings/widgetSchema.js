const mongoose = require('mongoose');

const widgetSchema = mongoose.Schema({
    type: String,
    title: String,
    categories:Array,
    tags:Array,
    count:Number,
    pagination:Boolean,
    position:String,
    redirectLink:String,
    redirectToTitle:String,
    sortBy:String,
    text:String,
    textAlign:String,
    customHtml:String,
    metaType:String

});

module.exports = mongoose.model("widgets", widgetSchema);