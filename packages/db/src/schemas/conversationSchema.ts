import { Schema, models, model, Model } from 'mongoose';

interface ISystemMessage {
  message: string;
  type: string;
  createdAt: Date;
}

interface IMessage {
  messageBody: string;
  author: any;
  createdAt: Date;
}

interface IConversation extends Document {
  users: any[];
  messages: IMessage[];
  systemMessages: ISystemMessage[];
}

const systemMessageSchema = new Schema<ISystemMessage>({
  message: String,
  type: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const messageSchema = new Schema<IMessage>({
  messageBody: String,
  author: { type: Schema.Types.ObjectId, ref: 'user' },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const conversationSchema = new Schema<IConversation>(
  {
    users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    messages: [messageSchema],
    systemMessages: [systemMessageSchema],
  },
  { timestamps: true },
);

const ConversationModel = (models?.conversation || model('conversation', conversationSchema)) as Model<any>;

export default ConversationModel;
