import { model, Schema, models, Document } from 'mongoose';
import { IChatroom } from '@repo/typescript-types';

const chatroomSchema = new Schema({
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
}, { timestamps: true });

const ChatroomModel = models?.chatroom || model<IChatroom & Document>('chatroom', chatroomSchema);

export default ChatroomModel;
