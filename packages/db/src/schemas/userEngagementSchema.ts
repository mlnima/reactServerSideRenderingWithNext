import mongoose, { Schema, models, model } from 'mongoose';

const UserEngagementSchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', unique: true},
  likedPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
  postsCount:Number,
}, { timestamps: true });

const UserEngagementModel = models?.userEngagement ||
  model('userEngagement', UserEngagementSchema);

export default UserEngagementModel;
