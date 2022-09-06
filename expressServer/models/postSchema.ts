const mongoose = require('mongoose');
const Schema = mongoose.Schema
import postTypes from "../../_dataStructures/postTypes";
import videoQualities from "../../_dataStructures/videoQualities";


const downloadLinks = mongoose.Schema({
    title:String,
    url:String
})

const postSchema =  new Schema({
    author: {type: Schema.Types.ObjectID, ref: 'user'},
    title: String,
    permaLink: String,
    company: String,
    description: mongoose.Mixed,
    descriptionRenderer: String,
    mainThumbnail: String,
    images:Array,
    videoTrailerUrl: String,
    quality: {
        type:String,
        enum:videoQualities,
        default:'HD'
    },
    translations:mongoose.Mixed,
    shippingCost:String,
    format: String,
    source: String,
    sourceSite: String,
    videoUrl: String,
    postType:{
        type:String,
        enum:postTypes
    },
    outPostType:{
        type:String,
        enum:postTypes
    },
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
    posts: [{type: Schema.Types.ObjectId, ref: 'post'}],
    comments: [{type:Schema.Types.ObjectId,ref:'comment'}],
    widgets:Array,
    categories: [{type:Schema.Types.ObjectId,ref:'meta'}],
    actors: [{type:Schema.Types.ObjectId,ref:'meta'}],
    tags: [{type:Schema.Types.ObjectId,ref:'meta'}],
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

export default mongoose.model("post", postSchema);
