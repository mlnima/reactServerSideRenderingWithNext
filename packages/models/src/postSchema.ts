const mongoose = require('mongoose');
const Schema = mongoose.Schema
import {postTypes, videoQualities} from "data-structures";

const downloadLinks = mongoose.Schema({
    title: String,
    url: String
})

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    permaLink: String,
    company: String,
    description: Schema.Types.Mixed,
    descriptionRenderer: String,
    //accept any url
    mainThumbnail: String,
    //uploaded image Id
    // mainThumbnailImage: {type: Schema.Types.ObjectId, ref: 'file'},
    images: [{type: Schema.Types.ObjectId, ref: 'file'}],
    videoTrailerUrl: String,
    quality: {
        type: String,
        enum: videoQualities,
        default: 'HD'
    },
    translations: Schema.Types.Mixed,
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
    posts: [{type: Schema.Types.ObjectId, ref: 'post'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
    // widgets: Array,
    categories: [{type: Schema.Types.ObjectId, ref: 'meta'}],
    actors: [{type: Schema.Types.ObjectId, ref: 'meta'}],
    tags: [{type: Schema.Types.ObjectId, ref: 'meta'}],
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
    uniqueData: Schema.Types.Mixed,


}, {timestamps: true});

interface IFindRelatedPostsByField{
    currentPostId:string,
    relatedByField:string,
    limit:number
}

postSchema.statics.findRelatedPostsByField = async function ({currentPostId, relatedByField, limit=8}:IFindRelatedPostsByField) {
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

interface IFindRelatedPosts {
    post: any;  // You can replace 'any' with the actual post document type
    relatedByFields: string[];
    limit?: number;
}

//*****************Author will be added  later******************
postSchema.statics.findRelatedPosts = async function ({post, relatedByFields, limit = 8}: IFindRelatedPosts) {
    try {
        let relatedPosts: any[] = [];
        let seenPosts: Set<string> = new Set();  // To keep track of seen posts

        // First loop to get posts by specified fields
        for (const field of relatedByFields) {
            const remainingLimit = limit - relatedPosts.length;  // Calculate remaining posts needed

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

export default mongoose.model("post", postSchema);


// throw new Error('Invalid relatedByField');

