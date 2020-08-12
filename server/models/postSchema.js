const mongoose = require('mongoose');
const Schema = mongoose.Schema

const postSchema =  new Schema({
    author: Schema.Types.ObjectID,
    title: String,
    company: String,
    description: String,
    mainThumbnail: String,
    images:Array,
    videoTrailerUrl: String,
    quality: {
        type:String,
        default:'1080p'
    },
    translations:mongoose.Mixed,
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
    priceType: String,
    production: String,
    comments: Array,
    categories: [Schema.Types.ObjectID],
    actors: [Schema.Types.ObjectID],
    tags: [Schema.Types.ObjectID],
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
    publishedDate:Date,
    premium: Boolean,
    inSlideShow: Boolean,
    rating:String
});

module.exports = mongoose.model("post", postSchema);