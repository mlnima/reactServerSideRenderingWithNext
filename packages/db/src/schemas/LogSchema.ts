import mongoose, { models, model, Model } from 'mongoose';

const Schema = mongoose.Schema;

const LogSchema = new Schema(
  {
    type: {
      type: String,
      url: String,
      enum: ['log', 'error'],
    },
  },
  { timestamps: true },
);

const LogModel = (models?.log || model('log', LogSchema)) as Model<any>;

export default LogModel;
