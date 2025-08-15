import mongoose, { models, model, Model } from 'mongoose';

const messengerConversationMessageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: false,
      enum: ['privateMessage', 'eventLog'],
      default: 'privateMessage',
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'messengerConversation',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    content: {
      type: String,
    },
    imageContent: {
      type: String,
    },
    audioContent: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const MessengerConversationMessageModel = (models?.messengerConversationMessage ||
  model('messengerConversationMessage', messengerConversationMessageSchema)) as Model<any>;

export default MessengerConversationMessageModel;
