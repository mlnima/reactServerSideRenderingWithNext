import mongoose, { Schema, models, model } from 'mongoose';
import { postTypes, videoQualities } from "@repo/data-structures";
import { postFieldRequestForCards } from '@repo/data-structures';
import { IPost } from '@repo/typescript-types';

interface IFindRelatedPostsByField {
    currentPostId: string,
    relatedByField: string,
    limit: number
}

interface IFindRelatedPosts {
    post: any;  // You can replace 'any' with the actual post document type
    relatedByFields: string[];
    limit?: number;
}

const downloadLinks = new Schema({
    title: String,
    url: String
});

const postSchema = new Schema({
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
    mainThumbnail: String,
    thumbnail: {type: mongoose.Schema.Types.ObjectId, ref: 'file'},
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

    downloadLink: String,
    downloadLinks: [downloadLinks],
    redirectLink: String,
    currency: String,
    iframe: String,
    status: {
        type: String,
        required: true,
        default: 'draft'
    },
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
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
    premium: Boolean,
    rating: Boolean,
    uniqueData: mongoose.Schema.Types.Mixed,

}, {timestamps: true});



postSchema.statics.findRelatedPostsByField = async function (
    {
        currentPostId,
        relatedByField,
        limit = 8
    }: IFindRelatedPostsByField) {
    try {
        if (!['actors', 'categories', 'tags', 'author'].includes(relatedByField)) {
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
        })
            .sort({updatedAt: -1, createdAt: -1})
            .limit(limit)
            .lean();
    } catch (error) {
        console.log('findRelatedPosts=> ', error);
        return [];
    }
};

postSchema.statics.findRelatedPosts = async function ({post, relatedByFields, limit = 8}: IFindRelatedPosts) {
    try {
        let relatedPosts: any[] = [];
        let seenPosts: Set<string> = new Set();

        for (const field of relatedByFields) {
            const remainingLimit = limit - relatedPosts.length;

            const postsByField = await this.find({
                [field]: {$in: post[field]},
                _id: {$ne: post._id, $nin: Array.from(seenPosts)},
                status: 'published'
            })
                .select(postFieldRequestForCards)
                .sort({updatedAt: -1, createdAt: -1})
                .limit(remainingLimit)
                .lean();

            for (const p of postsByField) {
                seenPosts.add(p._id.toString());
                relatedPosts.push(p);
            }

            if (relatedPosts.length >= limit) break;
        }

        const remainingLimit = limit - relatedPosts.length;
        if (remainingLimit > 0) {
            const fallbackPosts = await this.find({
                _id: {$ne: post._id, $nin: Array.from(seenPosts)},
                status: 'published'
            })
                .sort({updatedAt: -1, createdAt: -1})
                .limit(remainingLimit)
                .lean();


            relatedPosts = [...relatedPosts, ...fallbackPosts];
        }

        relatedPosts.sort((a, b) => b.updatedAt - a.updatedAt || b.createdAt - a.createdAt);

        return relatedPosts;
    } catch (error) {
        console.log('findRelatedPosts=> ', error);
        return [];
    }
};

const PostModel = models?.post || model("post", postSchema);

export default PostModel;

