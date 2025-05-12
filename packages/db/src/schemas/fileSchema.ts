import mongoose, { models, model } from 'mongoose';
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  usageType: String,
  filePath: {
    type: String,
    required: true,
  },
  mimeType: String,
}, { timestamps: true });

const FileModel = models?.file || model('file', fileSchema);

export default FileModel;
