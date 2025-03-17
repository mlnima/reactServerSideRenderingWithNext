import { Schema, models, model } from 'mongoose';
import { IEmail } from '@repo/typescript-types';

interface IEmailDocument extends Document, IEmail {
  from: string;
  to: string;
  receiver: any;
  sender?: any;
  subject: string;
  text: string;
  html?: string;
  read: boolean;
  status: 'sent' | 'received' | 'trash' | 'draft' | 'archived' | 'spam';
  attachments: any[];
}

const emailSchema = new Schema<IEmailDocument>({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  subject: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  html: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['sent', 'received', 'trash', 'draft', 'archived', 'spam'],
    default: 'sent',
  },
  attachments: [{
    type: Schema.Types.ObjectId,
    ref: 'file',
  }],
}, { timestamps: true });

const EmailModel = models?.email || model<IEmailDocument>('email', emailSchema);

export default EmailModel;
