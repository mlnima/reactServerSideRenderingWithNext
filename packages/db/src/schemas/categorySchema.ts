import { Schema, models, model } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
  status: String,
  imageUrl: String,
  translations: Schema.Types.Mixed,
  count: Number,
}, { timestamps: true });

const CategoryModel = models?.category || model('category', categorySchema);

export default CategoryModel;

