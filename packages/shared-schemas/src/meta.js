const mongoose = require('mongoose');

const MetaSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        uppercase: false
    },
    type: String,
    index: Number,
    description: String,
    status: {
        type: String,
        uppercase: false,
    },
    imageUrl: String,
    coverImageUrl: String,
    imageUrlLock: Boolean,
    icon: String,
    rankLock: Boolean,
    translations: mongoose.Schema.Types.Mixed,
    count: Number,
    likes: Number,
    views: Number,
    rank: Number,
    additionalInfo: mongoose.Schema.Types.Mixed,
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'meta'
    }
}, {timestamps: true});

MetaSchema.index({name: 1, type: 1}, {unique: true});

module.exports = mongoose.model("meta", MetaSchema);