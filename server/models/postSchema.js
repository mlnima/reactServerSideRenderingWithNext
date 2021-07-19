const mongoose = require('mongoose');
const Schema = mongoose.Schema

const postSchema =  new Schema({
    author: Schema.Types.ObjectID,
    title: String,
    company: String,
    description: mongoose.Mixed,
    mainThumbnail: String,
    images:Array,
    videoTrailerUrl: String,
    quality: {
        type:String,
        default:'1080p'
    },
    translations:mongoose.Mixed,
    shippingCost:String,
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
    comments: [{type:Schema.Types.ObjectID,ref:'comment'}],
    widgets:Array,
    categories: [{type:Schema.Types.ObjectID,ref:'meta'}],
    actors: [{type:Schema.Types.ObjectID,ref:'meta'}],
    tags: [{type:Schema.Types.ObjectID,ref:'meta'}],
    likes: {
        type: Number,
        default: 0
    },
    price: String,
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
    availableCount:Number,
    publishedDate:Date,
    premium: Boolean,
    inSlideShow: Boolean,
    rating:String,

},{ timestamps: true });

module.exports = mongoose.model("post", postSchema);