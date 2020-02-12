const mongoose = require('mongoose');

const homePageWidgetSchema = mongoose.Schema({
    type: String,
    title: String,
    PostsCount:Number,
    redirectLink:String
});

module.exports = mongoose.model("settings", homePageWidgetSchema);