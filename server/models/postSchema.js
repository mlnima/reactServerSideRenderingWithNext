const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    author: mongoose.ObjectId,
    title: {
        type: String,
        unique: true
    },
    company: String,
    description: String,
    mainThumbnail: String,
    videoTrailerUrl: String,
    quality: String,
    format: String,
    source: String,
    sourceSite: String,
    videoUrl: String,
    postType:String,
    videoEmbedCode: String,
    downloadLink: String,
    currency: String,
    iframe: String,
    status: String,
    Production: String,
    comments: Array,
    categories: Array,
    actors: Array,
    tags: Array,
    likes: Number,
    price: Number,
    disLikes: Number,
    views: Number,
    duration: String,
    lastModify: Date,
    premium: Boolean,
    inSlideShow: Boolean
});

module.exports = mongoose.model("posts", postSchema);