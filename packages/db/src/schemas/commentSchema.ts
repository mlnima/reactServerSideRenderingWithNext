import { model, Schema, models, Document, Model } from 'mongoose';
import { CommentRaw } from '@repo/typescript-types';

const commentSchema = new Schema(
  {
    onDocumentId: { type: Schema.Types.ObjectId, ref: 'post' },
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    reply: [],
    likes: {
      type: Number,
      default: 0,
    },
    disLikes: {
      type: Number,
      default: 0,
    },
    body: String,
    status: {
      type: String,
      default: 'approved',
    },
  },
  { timestamps: true },
);

const CommentModel = (models?.comment || model<CommentRaw & Document>('comment', commentSchema)) as Model<any>;

export default CommentModel;
