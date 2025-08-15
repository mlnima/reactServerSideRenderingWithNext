import mongoose, { models, model, Model } from 'mongoose';

const Schema = mongoose.Schema;

const messengerConversationSchema = new mongoose.Schema(
  {
    users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'messengerConversationMessage' }],
    status: {
      type: String,
      required: false,
      enum: ['restricted', 'active', 'archived'],
      default: 'active',
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

const MessengerConversationModel = (models?.messengerConversation ||
  model('messengerConversation', messengerConversationSchema)) as Model<any>;

export default MessengerConversationModel;
