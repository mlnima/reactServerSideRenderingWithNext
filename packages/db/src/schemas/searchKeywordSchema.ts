import { Schema, models, model } from 'mongoose';

interface ISearchKeyword extends Document {
  name: string;
  count: number;
  searchHits: number;
}

const searchKeywordSchema = new Schema({
  name: {
    type: String,
    required: true,
    uppercase: false,
    unique: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  searchHits: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const SearchKeywordModel = models?.searchKeyword || model<ISearchKeyword>('searchKeyword', searchKeywordSchema);
export default SearchKeywordModel;
