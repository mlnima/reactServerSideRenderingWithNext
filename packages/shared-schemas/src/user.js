const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    draftPost: {type: mongoose.Schema.Types.ObjectId, ref: 'post'},
    password: String,
    superAdministrator: {
        type: Boolean,
        default: false,
    },
    role: String,
    firstName: String,
    lastName: String,
    nickName: String,
    about: String,
    API_KEY: String,
    uuid: String,
    age: Number,
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
    LikedPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
    disLikedPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    blockList: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    conversation: [{type: mongoose.Schema.Types.ObjectId, ref: 'conversation'}],
    profileImage: mongoose.Schema.Types.Mixed,
    images: [{type: mongoose.Schema.Types.ObjectId, ref: 'file'}],
    gender: String,
    relationshipStatus: String,
    city: String,
    country: String,
    status: String,
    keyMaster: Boolean,
    verificationToken: String,
}, {timestamps: true});

module.exports = mongoose.model("user", UserSchema)