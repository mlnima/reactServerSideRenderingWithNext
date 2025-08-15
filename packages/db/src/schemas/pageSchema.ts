import { Schema, models, model, Model } from 'mongoose';

const pageSchema = new Schema(
  {
    pageName: {
      type: String,
      unique: true,
    },
    title: String,
    description: String,
    keywords: String,
    sidebar: String,
    status: String,
    imageUrl: String,
    translation: Schema.Types.Mixed,
    pageStyle: String,
  },
  { timestamps: true },
);

const PageModel = (models?.page || model('page', pageSchema)) as Model<any>;

export default PageModel;
