import { Schema, models, model, Model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: String,
    status: String,
    imageUrl: String,
    translations: Schema.Types.Mixed,
    count: Number,
  },
  { timestamps: true },
);

const CategoryModel = (models?.category || model('category', categorySchema)) as Model<any>;

export default CategoryModel;
