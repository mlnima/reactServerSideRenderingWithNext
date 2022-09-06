"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postTypes_1 = tslib_1.__importDefault(require("../../_dataStructures/postTypes"));
var videoQualities_1 = tslib_1.__importDefault(require("../../_dataStructures/videoQualities"));
var downloadLinks = mongoose.Schema({
    title: String,
    url: String
});
var postSchema = new Schema({
    author: { type: Schema.Types.ObjectID, ref: 'user' },
    title: String,
    permaLink: String,
    company: String,
    description: mongoose.Mixed,
    descriptionRenderer: String,
    mainThumbnail: String,
    images: Array,
    videoTrailerUrl: String,
    quality: {
        type: String,
        enum: videoQualities_1.default,
        default: 'HD'
    },
    translations: mongoose.Mixed,
    shippingCost: String,
    format: String,
    source: String,
    sourceSite: String,
    videoUrl: String,
    postType: {
        type: String,
        enum: postTypes_1.default
    },
    outPostType: {
        type: String,
        enum: postTypes_1.default
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
    createdAt: Date,
    updatedAt: Date
}, { timestamps: true });
exports.default = mongoose.model("post", postSchema);
//# sourceMappingURL=postSchema.js.map