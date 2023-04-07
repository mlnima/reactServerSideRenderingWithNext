"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    draftPost: { type: mongoose_1.Schema.Types.ObjectId, ref: 'post' },
    password: String,
    role: String,
    firstName: String,
    lastName: String,
    nickName: String,
    about: String,
    API_KEY: String,
    uuid: String,
    age: Number,
    followingCount: { type: Number, min: 0 },
    followersCount: { type: Number, min: 0 },
    postsCount: { type: Number, min: 0 },
    following: Array,
    posts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'post' }],
    followers: Array,
    blockList: Array,
    conversation: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'conversation' }],
    profileImage: mongoose_1.Schema.Types.Mixed,
    images: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'file' }],
    gender: String,
    relationshipStatus: String,
    city: String,
    country: String,
    status: String,
    keyMaster: Boolean
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("user", userSchema);
