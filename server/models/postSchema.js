const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    author: mongoose.ObjectId,
    title: {
        type: String,
        unique: true
    },
    company: String,
    duration: String,
    description: String,
    imageBig: String,
    imageMedium: String,
    imageSmall: String,
    hoverVideoPreview: String,
    iframe: String,
    status: String,
    Production:String,
    comments: Array,
    categories: Array,
    actors: Array,
    tags: Array,
    quality: Array,
    format: String,
    source: String,
    sourceSite: String,
    videoUrl: String,
    currency:String,
    likes: Number,
    price:Number,
    disLikes: Number,
    views: Number,
    lastModify: Date,
    publishDate: Date,
    premium:Boolean,
    inSlideShow:Boolean

});

module.exports = mongoose.model("posts", postSchema);