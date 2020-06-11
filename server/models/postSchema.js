const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    author: mongoose.Mixed,
    title: String,
    company: String,
    description: String,
    mainThumbnail: String,
    smallThumbnail: String,
    largeThumbnail: String,
    images:Array,
    videoTrailerUrl: String,
    quality: {
        type:String,
        default:'1080p'
    },
    format: String,
    source: String,
    sourceSite: String,
    videoUrl: String,
    postType:String,
    videoEmbedCode: String,
    videoScriptCode: String,
    downloadLink: String,
    currency: String,
    iframe: String,
    status: String,
    Production: String,
    comments: Array,
    categories: Array,
    actors: Array,
    tags: Array,
    likes: {
        type: Number,
        default: 0
    },
    price: Number,
    disLikes:  {
        type: Number,
        default: 0
    },
    views:  {
        type: Number,
        default: 0
    },
    duration:  {
        type: String,
        default: '00:00'
    },
    lastModify: {
        type:Date,
        default:Date.now()
    },
    premium: Boolean,
    inSlideShow: Boolean,
    rating:String
});

module.exports = mongoose.model("posts", postSchema);