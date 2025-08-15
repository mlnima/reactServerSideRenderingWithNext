import mongoose, { models, model, Model } from 'mongoose';

const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    widgetId: Schema.Types.ObjectId,
    language: String,
    formName: String,
    data: Schema.Types.Mixed,
  },
  { timestamps: true },
);

const FormModel = (models?.form || model('form', formSchema)) as Model<any>;

export default FormModel;
