import mongoose, { models, model } from 'mongoose';

const contactFormSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    subject: String,
    description: String,
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

const ContactModel = models?.contact || model('contact', contactFormSchema);

export default ContactModel;

