import { model, Schema, models, Model } from 'mongoose';

const chatroomSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },
    title: String,
    description: String,
    tags: String,
    status: String,
    messages: [{ type: Schema.Types.ObjectId, ref: 'chatroomMessage' }],
  },
  { timestamps: true },
);

const ChatroomModel = (models?.chatroom || model('chatroom', chatroomSchema)) as Model<any>;

export default ChatroomModel;
