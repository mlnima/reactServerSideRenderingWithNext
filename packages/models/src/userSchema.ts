import {model, Schema, Document} from "mongoose";
import {User} from "typescript-types";

const userSchema = new Schema({
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        draftPost: {type: Schema.Types.ObjectId, ref: 'post'},
        password: String,
        role: String,
        firstName: String,
        lastName: String,
        nickName: String,
        about: String,
        API_KEY: String,
        uuid: String,
        age: Number,
        followingCount: {type: Number, min: 0},
        followersCount: {type: Number, min: 0},
        postsCount: {type: Number, min: 0},
        following: Array,
        posts: [{type: Schema.Types.ObjectId, ref: 'post'}],
        followers: Array,
        blockList: Array,
        conversation: [{type: Schema.Types.ObjectId, ref: 'conversation'}],
        profileImage: Schema.Types.Mixed,
        images: [{type: Schema.Types.ObjectId, ref: 'file'}],
        gender: String,
        relationshipStatus: String,
        city: String,
        country: String,
        status: String,
        keyMaster: Boolean,
    }, {timestamps: true});

export default model<User & Document>("user", userSchema)