let mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique:true,
    },
    email: {
        type: String,
        unique:true,
    },
    password: String,
    reg_time : {
        type : Date,
        default: Date.now
    },
    role:String,
    keyMaster:{
        type:Boolean,
        default: false
    },
    firstName:String,
    lastName:String,
    nickName:String,
    friends:Array,
    following:Array,
    followers:Array,
    pendingSentFriendRequests:Array,
    pendingReceivedFriendRequests:Array,
    inbox:Array,
    blockList:Array,
    profileImage:String,
    mediumProfileImage:String,
    smallProfileImage:String,
    coverImage:String,
    gender:String,
    relationshipStatus:String,
    city:String,
    country:String,
    status:Boolean,
    online:Boolean,
    sexualOrientation:String,
    about:String,
    API_KEY:String,
    uuid:String
});


module.exports = mongoose.model("users",userSchema)