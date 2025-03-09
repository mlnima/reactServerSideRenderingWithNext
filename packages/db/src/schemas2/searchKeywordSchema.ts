import mongoose, { Document, Schema } from 'mongoose';

interface ISearchKeyword extends Document {
    name: string;
    count: number;
    searchHits: number;
}

const searchKeywordSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        uppercase: false,
        unique: true
    },
    count: {
        type: Number,
        default: 0
    },
    searchHits: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model<ISearchKeyword>('searchKeyword', searchKeywordSchema);
