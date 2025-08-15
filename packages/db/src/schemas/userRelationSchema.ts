import mongoose, { Schema, models, model, Model } from 'mongoose';

const UserRelationSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', unique: true },
    blockList: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    followingCount: Number,
    followersCount: Number,
  },
  { timestamps: true },
);

const UserRelationModel = (models?.userRelation || model('userRelation', UserRelationSchema)) as Model<any>;

export default UserRelationModel;
