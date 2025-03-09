import {model, Schema} from "mongoose";

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
        following: [{type: Schema.Types.ObjectId, ref: 'user'}],
        followingCount:Number,
        posts: [{type: Schema.Types.ObjectId, ref: 'post'}],
        postsCount:Number,
        LikedPosts: [{type: Schema.Types.ObjectId, ref: 'post'}],
        disLikedPosts: [{type: Schema.Types.ObjectId, ref: 'post'}],
        followers: [{type: Schema.Types.ObjectId, ref: 'user'}],
        followersCount:Number,
        blockList: [{type: Schema.Types.ObjectId, ref: 'user'}],
        conversation: [{type: Schema.Types.ObjectId, ref: 'conversation'}],
        profileImage: Schema.Types.Mixed,
        images: [{type: Schema.Types.ObjectId, ref: 'file'}],
        gender: String,
        relationshipStatus: String,
        city: String,
        country: String,
        status: String,
        isVerified: Boolean,
        keyMaster: Boolean,
        verificationToken: String,
    }, {timestamps: true});




export default model("user", userSchema)

//******************* do not delete*************************
// interface IUser extends Document {
//         // your other fields
//         superAdministrator: boolean;
// }
//
// interface IUserModel extends Model<IUser> {
//         // any static methods
// }
//
// userSchema.pre('save', async function (this: IUser, next) {
//         if (this.isModified('superAdministrator') && this.superAdministrator === true) {
//                 const existingSuperAdmin = await (this.constructor as IUserModel).findOne({ superAdministrator: true });
//                 if (existingSuperAdmin) {
//                         // A super administrator already exists
//                         throw new Error('A super administrator already exists.');
//                 }
//         }
//         next();
// });