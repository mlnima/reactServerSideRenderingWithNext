const mongoose = require('mongoose');
const {postTypes, videoQualities} = require("data-structure") ;

const downloadLinks = new mongoose.Schema({
    title: String,
    url: String
})

const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    permaLink: String,
    company: String,
    description: mongoose.Schema.Types.Mixed,
    descriptionRenderer: String,
    //accept any url
    mainThumbnail: String,
    //uploaded image Id
    // mainThumbnailImage: {type: Schema.Types.ObjectId, ref: 'file'},
    images: [{type: mongoose.Schema.Types.ObjectId, ref: 'file'}],
    videoTrailerUrl: String,
    quality: {
        type: String,
        enum: videoQualities,
        default: 'HD'
    },
    translations: mongoose.Schema.Types.Mixed,
    shippingCost: String,
    format: String,
    source: String,
    sourceSite: String,
    videoUrl: String,
    postType: {
        type: String,
        enum: postTypes
    },
    outPostType: {
        type: String,
        enum: postTypes
    },
    videoEmbedCode: String,
    videoScriptCode: String,
    VideoTrailerUrl: String,
    downloadLink: String,
    downloadLinks: [downloadLinks],
    redirectLink: String,
    currency: String,
    iframe: String,
    status: {
        type:String,
        required:true,
        default:'draft'
    },
    // priceType: String,
    // production: String,
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
    // widgets: Array,
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'meta'}],
    actors: [{type: mongoose.Schema.Types.ObjectId, ref: 'meta'}],
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'meta'}],
    likes: {
        type: Number,
        default: 0
    },
    price: String,
    disLikes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String,
        default: '00:00'
    },
    // availableCount: Number,
    premium: Boolean,
    rating: Boolean,
    uniqueData: mongoose.Schema.Types.Mixed,


}, {timestamps: true});


PostSchema.statics.findRelatedPostsByField = async function ({currentPostId, relatedByField, limit=8}) {
    try {
        if (!['actors', 'categories', 'tags','author'].includes(relatedByField)) {
            return [];
        }

        const post = await this.findById(currentPostId).select(relatedByField);

        if (!post) {
            return [];
        }

        return await this.find({
            [relatedByField]: {$in: post[relatedByField]},
            _id: {$ne: currentPostId},
            status: 'published'
        }).sort({updatedAt: -1, createdAt: -1}).limit(limit);
    }catch (error){
        console.log('findRelatedPosts=> ',error)
        return []
    }
};

PostSchema.statics.findRelatedPosts = async function ({post, relatedByFields, limit = 8}) {
    try {
        let relatedPosts = [];
        let seenPosts = new Set();

        // First loop to get posts by specified fields
        for (const field of relatedByFields) {
            const remainingLimit = limit - relatedPosts.length;

            const postsByField = await this.find({
                [field]: { $in: post[field] },
                _id: { $ne: post._id, $nin: Array.from(seenPosts) },  // Exclude seen posts
                status: 'published'
            })
                .sort({ updatedAt: -1, createdAt: -1 })
                .limit(remainingLimit);

            // Add the IDs to seenPosts and the posts to relatedPosts
            for (const p of postsByField) {
                seenPosts.add(p._id.toString());
                relatedPosts.push(p);
            }

            if (relatedPosts.length >= limit) break;  // Stop if we've reached the limit
        }

        // Fallback loop to fill up to the limit with any published posts
        const remainingLimit = limit - relatedPosts.length;
        if (remainingLimit > 0) {
            const fallbackPosts = await this.find({
                _id: { $ne: post._id, $nin: Array.from(seenPosts) },
                status: 'published'
            })
                .sort({ updatedAt: -1, createdAt: -1 })
                .limit(remainingLimit);

            relatedPosts = [...relatedPosts, ...fallbackPosts];
        }

        // Sort combined related posts by updatedAt, then by createdAt
        relatedPosts.sort((a, b) => b.updatedAt - a.updatedAt || b.createdAt - a.createdAt);

        return relatedPosts;
    } catch (error) {
        console.log('findRelatedPosts=> ', error);
        return [];
    }
};

module.exports = mongoose.model("post", PostSchema);