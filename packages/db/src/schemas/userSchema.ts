import { Schema, models, model } from 'mongoose';
import { User } from '@repo/typescript-types';
import './fileSchema';

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  draftPost: { type: Schema.Types.ObjectId, ref: 'post' },
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
  following: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  followingCount: Number,
  postsCount: Number,
  LikedPosts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
  disLikedPosts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  followersCount: Number,
  blockList: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  conversation: [{ type: Schema.Types.ObjectId, ref: 'conversation' }],
  profileImage: Schema.Types.Mixed,
  images: [{ type: Schema.Types.ObjectId, ref: 'file' }],
  gender: String,
  relationshipStatus: String,
  city: String,
  country: String,
  status: String,
  isVerified: Boolean,
  keyMaster: Boolean,
  verificationToken: String,
}, { timestamps: true });

const UserModel = models?.user || model<User>('user', userSchema);

export default UserModel;
