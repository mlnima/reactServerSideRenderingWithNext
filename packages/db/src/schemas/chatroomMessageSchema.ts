import { model, Schema, models, Document, Model } from 'mongoose';
import { ChatroomMessage } from '@repo/typescript-types';

const chatroomMessageSchema = new Schema(
  {
    chatroom: { type: Schema.Types.ObjectId, ref: 'chatroom' },
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    image: String,
    type: String,
    messageData: String,
  },
  { timestamps: true },
);

const ChatroomMessageModel = (models?.chatroomMessage || model('chatroomMessage', chatroomMessageSchema)) as Model<any>;

export default ChatroomMessageModel;
