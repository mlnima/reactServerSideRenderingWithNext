const mongoose = require('mongoose');
const Schema = mongoose.Schema
import {postTypes, videoQualities} from "data-structures";

const downloadLinks = mongoose.Schema({
    title: String,
    url: String
})

const postSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    title: String,
    permaLink: String,
    company: String,
    description: Schema.Types.Mixed,
    descriptionRenderer: String,
    mainThumbnail: String,
    images: Array,
    videoTrailerUrl: String,
    quality: {
        type: String,
        enum: videoQualities,
        default: 'HD'
    },
    translations: Schema.Types.Mixed,
    shippingCost: String,
    format: String,
    source: String,
    sourceSite: String,
    videoUrl: String,
    postType: {
        type: String,
        enum: postTypes
    },
    outPostType: {
        type: String,
        enum: postTypes
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
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
    widgets: Array,
    categories: [{type: Schema.Types.ObjectId, ref: 'meta'}],
    actors: [{type: Schema.Types.ObjectId, ref: 'meta'}],
    tags: [{type: Schema.Types.ObjectId, ref: 'meta'}],
    likes: {
        type: Number,
        default: 0
    },
    price: String,
    disLikes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String,
        default: '00:00'
    },
    availableCount: Number,
    premium: Boolean,
    rating: Boolean,
    uniqueData: Schema.Types.Mixed,


}, {timestamps: true});

export default mongoose.model("post", postSchema);

