"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var data_structures_1 = require("data-structures");
var downloadLinks = mongoose.Schema({
    title: String,
    url: String
});
var postSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'user' },
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
        "enum": data_structures_1.videoQualities,
        "default": 'HD'
    },
    translations: Schema.Types.Mixed,
    shippingCost: String,
    format: String,
    source: String,
    sourceSite: String,
    videoUrl: String,
    postType: {
        type: String,
        "enum": data_structures_1.postTypes
    },
    outPostType: {
        type: String,
        "enum": data_structures_1.postTypes
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
    posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    widgets: Array,
    categories: [{ type: Schema.Types.ObjectId, ref: 'meta' }],
    actors: [{ type: Schema.Types.ObjectId, ref: 'meta' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'meta' }],
    likes: {
        type: Number,
        "default": 0
    },
    price: String,
    disLikes: {
        type: Number,
        "default": 0
    },
    views: {
        type: Number,
        "default": 0
    },
    duration: {
        type: String,
        "default": '00:00'
    },
    availableCount: Number,
    premium: Boolean,
    rating: Boolean,
    createdAt: Date,
    updatedAt: Date
}, { timestamps: true });
exports["default"] = mongoose.model("post", postSchema);
