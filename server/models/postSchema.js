const mongoose = require('mongoose');
const Schema = mongoose.Schema

const downloadLinks = mongoose.Schema({
    title:String,
    url:String
})

const postSchema =  new Schema({
    author: {type: Schema.Types.ObjectID, ref: 'user'},
    title: String,
    company: String,
    description: mongoose.Mixed,
    descriptionRenderer: String,
    mainThumbnail: String,
    images:Array,
    videoTrailerUrl: String,
    quality: {
        type:String,
        default:'HD'
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
    VideoTrailerUrl: String,
    downloadLink: String,
    downloadLinks: [downloadLinks],
    redirectLink: String,
    currency: String,
    iframe: String,
    status: String,
    priceType: String,
    production: String,
    posts: [{type: Schema.Types.ObjectID, ref: 'post'}],
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
    availableCount:Number,
    premium: Boolean,
    rating:Boolean,
    createdAt:Date,
    updatedAt:Date

},{ timestamps: true });

module.exports = mongoose.model("post", postSchema);



// categories: [{type:Schema.Types.ObjectID,ref:'meta'}],
//     actors: [{type:Schema.Types.ObjectID,ref:'meta'}],
//     tags: [{type:Schema.Types.ObjectID,ref:'meta'}],