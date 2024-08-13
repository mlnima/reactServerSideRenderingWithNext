// @ts-nocheck
import {Response, Request} from 'express';
import {mongoIdValidator} from '@util/data-validators';
import postSchema from '@schemas/postSchema';
import searchKeywordSchema from '@schemas/searchKeywordSchema';
import metaSchema from '@schemas/metaSchema';
import {postFieldRequestForCards} from '@repo/data-structures/dist/src';
import userSchema from '@schemas/userSchema';
import mongoose from 'mongoose';
import commentSchema from '@schemas/commentSchema';
import {multiQueryUniquer} from '@util/queryUtil';
import {Post, Meta} from '@repo/typescript-types';
import {reqQueryToMongooseOptions} from '@util/database-util';
import updateSaveMetas from '@util/_updateSaveMetas';
import xHScrapper from '@util/scrappers/xHScrapper';
import xHSimilarFinder from '@util/scrappers/xHSimilarFinder';
import fs from 'fs';
import {isMainThread, parentPort, Worker} from 'worker_threads';
import GlobalStore from '@store/GlobalStore';
import FileManagerController from './FileManagerController';
import path from 'path';
import fsExtra from 'fs-extra';
import {getCurrentDatePath} from '@util/path-utils';
import {UploadedFile} from 'express-fileupload';
import fileSchema from '@schemas/fileSchema';
import {postStatuses, postTypes} from "@repo/data-structures";
import axios from 'axios';

class PostController {
    //---------------------helpers-------------------
    // static async findRelatedPosts(post: Post) {
    //     try {
    //         const relatedByFields = ['actors', 'categories', 'tags'];
    //         //@ts-ignore
    //         return await postSchema.findRelatedPosts({post, relatedByFields, limit: 8});
    //     } catch (error) {
    //         console.log(error);
    //         return [];
    //     }
    // }

    static async saveSearchedKeyword(keyword: string, postsCount: number) {
        if (!keyword) return;
        try {
            await searchKeywordSchema
                .findOneAndUpdate(
                    {name: keyword},
                    {
                        $set: {
                            name: keyword,
                            count: postsCount,
                        },
                        // $inc: { searchHits: 1 },
                    },
                    {upsert: true},
                )
                .exec();
            console.log(`keyword ${keyword} Saved in DB with ${postsCount} result`);
        } catch (error) {
            console.log('error=> ', error);
        }
    }

    static async findMeta(meta: string) {
        try {
            if (mongoIdValidator(meta)) {
                return await metaSchema.findById(meta).exec();
            } else {
                return await metaSchema.findOne({
                    name: {$regex: decodeURIComponent(meta), $options: 'i'},
                });
            }
        } catch (err) {
            console.log(`findMeta=> `, err)
            return {};
        }
    }

    static findPostQueryGenerator(req: Request) {
        const hasId = req.query?._id && mongoIdValidator(multiQueryUniquer(req.query?._id));
        const decodeTitle = req.query?.title ? decodeURIComponent(multiQueryUniquer(req.query?.title)) : '';

        return hasId
            ? {_id: req.query._id}
            : decodeTitle
                ? //@ts-ignore
                {$or: [{title: decodeTitle}, {permaLink: decodeTitle.replaceAll(' ', '-')}]}
                : null;
    }

    static async setDraftPostToUserData(userId: string, draftPostId: string) {
        try {
            return await userSchema.findByIdAndUpdate(userId, {$set: {draftPost: draftPostId}}, {new: true}).exec();
        } catch (error) {
            console.error('Error updating user draft post:', error);
            throw error;
        }
    }

    static async deleteDraftPostFromUserData(userId: string) {
        try {
            await userSchema.findByIdAndUpdate(userId, {$unset: {draftPost: ''}});
        } catch (error) {
            console.log(`error deleteDraftPostFromUserData=> `, error);
        }
    }

    static async findPostsWithDuplicatedMeta(duplicate: Meta[]) {
        try {
            let metasWithCount = [];

            for await (const item of duplicate.ids) {
                const postsWithThisMeta = await postSchema
                    .countDocuments({
                        $or: [{categories: item}, {tags: item}, {actors: item}],
                    })
                    .exec();
                metasWithCount.push({_id: item, count: postsWithThisMeta});
            }

            const highestCountMeta = Math.max(...metasWithCount.map(item => item.count));
            const itemWithHighestCount = metasWithCount.find(item => item.count === highestCountMeta);
            const itemsToRemoveFromPosts = metasWithCount.filter(meta => meta._id !== itemWithHighestCount._id);

            for await (const wrongMeta of itemsToRemoveFromPosts) {
                const postWithWrongMeta = await postSchema.find({[duplicate._id.type]: wrongMeta._id}).exec();

                for await (const post of postWithWrongMeta) {
                    await postSchema
                        .findByIdAndUpdate(
                            post._id,
                            {
                                $pull: {
                                    [duplicate._id.type]: wrongMeta._id,
                                },
                            },
                            {new: true},
                        )
                        .exec();

                    await postSchema
                        .findByIdAndUpdate(
                            post._id,
                            {
                                $push: {
                                    [duplicate._id.type]: itemWithHighestCount._id,
                                },
                            },
                            {new: true},
                        )
                        .exec();
                }

                await metaSchema.findByIdAndDelete(wrongMeta?._id).exec();
            }
        } catch (error) {
        }
    }

    static async savePostThumbnail(file: UploadedFile | UploadedFile[], postTitle: string) {
        const image = file;
        const nowTime = Date.now();

        const uploadFolderPath = `/public/uploads/images/${getCurrentDatePath()}`;
        const uploadFilePath = `${uploadFolderPath}/${encodeURIComponent(postTitle)}-${nowTime}.webp`;
        const targetDirectoryPath = path.join(process.cwd(), uploadFolderPath);
        const targetFilePath = path.join(process.cwd(), uploadFilePath);

        await fsExtra.ensureDir(targetDirectoryPath);
        try {
            await image.mv(targetFilePath);
            const imageDocumentToSave = new fileSchema({
                usageType: 'thumbnail',
                filePath: uploadFilePath,
                mimeType: image.mimetype,
            });
            const savedImage = await imageDocumentToSave.save();
            return savedImage
        } catch (error) {
            console.log(`savePostImages=> `, error);
        }
    }

    static async deletePostThumbnail(_id) {
        try {
            const imageDocument = await fileSchema.findById(_id).lean().exec();
            if (imageDocument) {
                await fsExtra.unlink(path.join(process.cwd(), imageDocument.filePath), () => null);
                await fileSchema.findByIdAndDelete(_id).exec();
            }
        } catch (error) {
            console.log(`error deletePostThumbnail=> `, error)
        }
    }

    //---------------------client--------------------
    static async updatePost(req: Request, res: Response) {
        try {
            let postData;

            try {
                postData = JSON.parse(req.body?.data)
            } catch (error) {

            }

            if (!postData) {
                res.status(400).json({message: 'Post data is missing'});
                return
            }

            const countUserPendingPosts = await postSchema.countDocuments({
                $and: [
                    {author: req.userData._id},
                    {status: 'pending'}
                ]
            })

            if (countUserPendingPosts >= 10 && !postData._id) {
                res.status(400)
                    .json({
                        message: 'You can not have more than 5 pending posts. Please wait for previous posts to be approved'
                    });
                return
            }

            const image = Array.isArray(req.files) ? req.files[0] : req.files;
            const postThumbnail = !!image ? await PostController.savePostThumbnail(image?.thumbnail, postData?.title) : [];
            const thumbnailSavingData = postThumbnail?._id ? {thumbnail: postThumbnail._id} : {}

            const postDataToSet = {
                ...postData,
                ...thumbnailSavingData,
                status: 'pending'
            }


            if (postData._id) {
                const post = await postSchema.findById(postData._id).lean().exec();

                if (req.userData._id.toString() !== post?.author.toString()) {
                    res.status(401).json({
                        message: 'unauthorized'
                    });
                    return
                }

                if (
                    (!postData?.thumbnail && !!post?.thumbnail) ||
                    (!!post.thumbnail && !!image)
                ) {
                    await PostController.deletePostThumbnail(post?.thumbnail)
                }


                // if (post.thumbnail._id && !!image){
                //     await PostController.deletePostThumbnail(post.thumbnail)
                // }

                const updatedPost = await postSchema
                    .findByIdAndUpdate(postData?._id, postDataToSet, {new: true})
                    .exec();

                res.json({
                    message: 'Your changes are pending for Moderator Approval',
                    postId: updatedPost._id,
                });


            } else {

                const newPostDataToSave = new postSchema(postDataToSet);

                const savedPost = await newPostDataToSave.save();
                res.json({
                    message: 'Saved, Your post is pending for moderator Approval',
                    postId: savedPost._id,
                });
                return
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Something Went Wrong'});
        }
    }

    static async getPost(req: Request, res: Response) {
        try {
            const findQuery = PostController.findPostQueryGenerator(req);

            if (findQuery) {
                const post = await postSchema
                    .findOne(findQuery, '-comments -views -likes -disLikes')
                    .populate([
                        {
                            path: 'author',
                            select: ['username', 'profileImage', 'role'],
                            populate: {path: 'profileImage', model: 'file'},
                        },
                        {path: 'categories', select: {name: 1, type: 1}},
                        {path: 'images', select: {filePath: 1}, model: 'file'},
                        {path: 'tags', select: {name: 1, type: 1}},
                        {path: 'actors', select: {name: 1, type: 1, imageUrl: 1}},
                        {path: 'thumbnail', select: {filePath: 1}},
                    ])
                    .exec();

                if (post) {
                    //@ts-ignore
                    //  const relatedPosts = await PostController.findRelatedPosts(post);
                    const relatedPosts = await postSchema.findRelatedPosts({
                        post,
                        relatedByFields: ['actors', 'categories', 'tags'],
                        limit: 8
                    });
                    res.json({
                        post,
                        relatedPosts,
                        error: false,
                    });
                } else {
                    res.status(404).json({message: 'not found'});
                }
            } else {
                res.status(404).json({message: 'not found'});
            }
        } catch (err) {
            console.error(err, 'get post error');
            res.status(500).json({message: 'Something went wrong please try again later'});
        }
    }

    static async getEditingPost(req: Request, res: Response) {
        try {
            const findQuery = PostController.findPostQueryGenerator(req);

            if (findQuery) {
                const post = await postSchema
                    .findOne(findQuery, '-comments')
                    .populate([
                        {
                            path: 'author',
                            select: ['username', 'profileImage', 'role'],
                            populate: {path: 'profileImage', model: 'file'},
                        },
                        {path: 'categories', select: {name: 1, type: 1}},
                        {path: 'images', select: {filePath: 1}, model: 'file'},
                        {path: 'tags', select: {name: 1, type: 1}},
                        {path: 'actors', select: {name: 1, type: 1, imageUrl: 1}},
                    ])
                    .exec();

                if (post) {
                    res.json({
                        post,
                    });
                } else {
                    res.status(404).json({message: 'not found'});
                }
            } else {
                res.status(404).json({message: 'not found'});
            }
        } catch (err) {
            console.error(err, 'get post error');
            res.status(500).json({message: 'Something went wrong please try again later'});
        }
    }

    static async getPostView(req: Request, res: Response) {
        try {
            const findQuery = PostController.findPostQueryGenerator(req);

            const postData = await postSchema.findOne(findQuery).select('views').exec();

            if (postData) {
                res.status(200).json({
                    views: postData?.views,
                });
            } else {
                res.status(404).json({message: 'not found'});
            }
        } catch (err) {
            console.error(err, 'get post error');
            res.status(500).json({message: 'Something went wrong please try again later'});
        }
    }

    static async getPostRating(req: Request, res: Response) {
        try {
            const findQuery = PostController.findPostQueryGenerator(req);

            const postData = await postSchema.findOne(findQuery).select(['likes', 'disLikes']).exec();

            if (postData) {
                res.status(200).json({
                    likes: postData?.likes,
                    disLikes: postData?.disLikes,
                });
            } else {
                res.status(404).json({message: 'not found'});
            }
        } catch (err) {
            console.error(err, 'get post error');
            res.status(500).json({message: 'Something went wrong please try again later'});
        }
    }

    static async getPosts(req: Request, res: Response) {
        console.log(`______________________getPosts fired=> `,)
        try {
            const {locale, metaId, postType} = req.query;
            const meta = metaId ? await PostController.findMeta(multiQueryUniquer(metaId)) : null;
            const metaQuery = metaId
                ? [{$or: [{categories: {$in: metaId}}, {tags: {$in: metaId}}, {actors: {$in: metaId}}]}]
                : [];
            const postTypeQuery = postType ? [{postType: postType}] : [{}];

            const findPostsQueries = {
                $and: [...metaQuery, ...postTypeQuery, {status: 'published'}],
            };

            const totalCount = await postSchema.countDocuments(findPostsQueries).exec();

            const posts = await postSchema
                .find(findPostsQueries, null, reqQueryToMongooseOptions(req))
                .populate([
                    {path: 'thumbnail', select: {filePath: 1}}
                ])
                .select([...postFieldRequestForCards, `translations.${locale}.title`])
                .exec();

            res.json({posts, totalCount, meta});
        } catch (err) {
            console.log(err);
            return res.status(503).json({
                message: 'Server Error',
            });
        }
    }

    static async getUserPagePosts(req: Request, res: Response) {
        try {
            const contentPerPage = GlobalStore.getContentPerPage();

            const authorId = req.query.authorId;
            const skip = req.query.skip || 0;

            const posts = await postSchema.find(
                {$and: [{author: authorId}, {status: req.query.status || 'published'}]},
                [...postFieldRequestForCards, 'status'],
                {
                    skip: skip,
                    limit: contentPerPage || 20,
                },
            )
                .populate([{path: 'thumbnail', select: {filePath: 1}}])
                .exec();

            res.json({posts});
        } catch (error) {
            console.log(error.stack);
            res.status(503).json({
                message: 'Server Error',
            });
        }
    }

    static async searchSuggestions(req: Request, res: Response) {
        try {
            const {userInput} = req.query;

            // Ensure userInput is a string
            if (typeof userInput !== 'string') {
                return res.status(400).json({message: 'Invalid input'});
            }

            // Use a regular expression to find keywords that start with the user input
            const regex = new RegExp(`^${userInput}`, 'i');
            const suggestions = await searchKeywordSchema.find(
                {name: regex},
                {
                    name: 1,
                    count: 1
                }
            ).exec();

            res.status(200).json(suggestions);
        } catch (error) {
            return res.status(500).json({message: 'Something Went Wrong'});
        }
    }

    static async searchPosts(req: Request, res: Response) {
        if (!req.query.keyword) {
            res.status(400).json({message: 'Bad Request'});
            return;
        }

        try {
            const locale = req.query.locale;
            const locales = GlobalStore.getLocales({withDefault: false});

            const decodedKeyword = req.query.keyword ? decodeURIComponent(req.query.keyword) : '';
            const keyword = decodedKeyword.toLowerCase();

            const size = req.query.size ? (req.query.size > 100 ? 100 : 20) : 20;
            const page = req.query.page ? req.query.page : 20;

            let postsTranslationsSearchQuery = [];
            let metasTranslationsSearchQuery = [];

            if (locale) {
                for await (const locale of locales) {
                    metasTranslationsSearchQuery.push({
                        [`translations.${locale}.name`]: new RegExp(keyword, 'i'),
                    });
                }
                for await (const locale of locales) {
                    postsTranslationsSearchQuery.push({
                        [`translations.${locale}.title`]: new RegExp(keyword, 'i'),
                    });
                    postsTranslationsSearchQuery.push({
                        [`translations.${locale}.description`]: new RegExp(keyword, 'i'),
                    });
                }
            }

            const postSearchQuery = {
                $and: [
                    {
                        $or: [
                            {title: new RegExp(keyword, 'i')},
                            {description: new RegExp(keyword, 'i')},
                            ...postsTranslationsSearchQuery,
                        ],
                    },
                    {status: 'published'},
                ],
            };

            const metasSearchQuery = {
                $and: [{$or: [{name: new RegExp(keyword, 'i')}, ...metasTranslationsSearchQuery]}, {status: 'published'}],
            };

            const posts = await postSchema
                .find(postSearchQuery, postFieldRequestForCards, {
                    limit: size,
                    skip: size * page - size,
                })
                .select([...postFieldRequestForCards, `translations.${locale}.title`])
                .exec();
            const totalCount = await postSchema.countDocuments(postSearchQuery).exec();
            const metas = await metaSchema.find(metasSearchQuery).limit(size).exec();

            if (totalCount > 0) {
                await PostController.saveSearchedKeyword(keyword, totalCount);
            }

            res.json({
                posts,
                totalCount,
                metas,
            });
        } catch (err) {
            console.log(`err=> `, err);
            return res.status(500).json({message: 'Something Went Wrong'});
        }
    }

    static async deletePost(req: Request, res: Response) {
        try {
            if (!req.query._id) {
                res.status(400).json({
                    message: 'Bad Request',
                });
                return;
            }

            const userData = req.userData;
            const _id = req.query._id;

            const deletingPost = await postSchema
                .findById(_id)
                .select('author images')
                .populate([
                    {
                        path: 'images',
                        select: {filePath: 1},
                        model: 'file',
                    },
                    {
                        path: 'thumbnail',
                        select: {filePath: 1},
                        model: 'file',
                    },
                ])
                .lean()
                .exec();

            if (deletingPost.author.toString() !== userData._id.toString()) {
                res.status(401).json({
                    message: 'Unauthorized',
                });
                return;
            }

            if (deletingPost.images.length > 0) {
                for await (const image of deletingPost.images) {
                    const absoluteImagePath = path.join(process.cwd(), image.filePath);
                    await fsExtra.unlink(absoluteImagePath, () => null);
                    await fileSchema.findByIdAndDelete(image._id).exec();
                }
            }
            if (deletingPost?.thumbnail?._id) {
                const absoluteImagePath = path.join(process.cwd(), deletingPost?.thumbnail.filePath);
                await fsExtra.unlink(absoluteImagePath, () => null);
                await fileSchema.findByIdAndDelete(deletingPost?.thumbnail?._id).exec();
            }

            await postSchema.findByIdAndDelete(_id).exec();
            await userSchema.findByIdAndUpdate(req.userData._id, {$unset: {draftPost: 1}}).exec();

            res.status(200).json({message: 'Post Deleted Successfully'});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Something Went Wrong'});
        }
    }

    static async likeDislikeView(req: Request, res: Response) {
        postSchema
            .findByIdAndUpdate(
                req.body.id,
                {$inc: {[req.body.type]: 1}},
                {
                    new: true,
                    timestamps: false,
                },
            )
            .select(' likes , disLikes , views ')
            .exec()
            .then(updatedData => {
                res.json({updatedData});
            })
            .catch(err => {
                console.log(err);
                res.end();
            });
    }

    static async likeDislike(req: Request, res: Response) {
        try {
            const userId = req.userData._id;
            const postId = new mongoose.Types.ObjectId(req.body._id);
            const type = req.body.type; // 'likes' or 'disLikes'
            const oppositeType = type === 'likes' ? 'disLikes' : 'likes';

            const user = await userSchema.findById(userId);

            const userField = type === 'likes' ? 'LikedPosts' : 'disLikedPosts';
            const oppositeField = type === 'likes' ? 'disLikedPosts' : 'LikedPosts';

            const alreadyDone = user[userField].some(id => id.equals(postId));
            const oppositeDone = user[oppositeField].some(id => id.equals(postId));

            let userUpdateQuery = {};
            let postIncQuery = {[type]: 0, [oppositeType]: 0};

            if (oppositeDone) {
                userUpdateQuery = {
                    $pull: {[oppositeField]: postId},
                    $addToSet: {[userField]: postId},
                };
                postIncQuery[type] = 1;
                postIncQuery[oppositeType] = -1;
            } else if (alreadyDone) {
                userUpdateQuery = {$pull: {[userField]: postId}};
                postIncQuery[type] = -1;
            } else {
                userUpdateQuery = {$addToSet: {[userField]: postId}};
                postIncQuery[type] = 1;
            }

            // Update user
            await userSchema.findByIdAndUpdate(userId, userUpdateQuery);

            // Update post
            const updatedPost = await postSchema.findByIdAndUpdate(postId, {$inc: postIncQuery}, {new: true});

            res.status(200).json({
                likes: updatedPost.likes,
                disLikes: updatedPost.disLikes,
            });
        } catch (error) {
            console.log('error=> ', error);
            return res.status(500).json({message: 'Something Went Wrong'});
        }
    }

    static async newPost(req: Request, res: Response) {
        try {
            const userData = await userSchema.findById(req.userData._id).select('draftPost').exec();

            if (userData?.draftPost) {
                const exist = await postSchema.exists({_id: userData?.draftPost}).exec();
                console.log(`exist=> `, exist);
                if (exist) {
                    res.json({
                        message: 'Edit or Delete Your Existing Draft Before Creating a New Post',
                        postId: userData.draftPost,
                    });
                    return;
                }
            }

            const newPostDataToSave = new postSchema(req.body.data);
            newPostDataToSave.save(async (error: any, savedPostData: { _id: any }) => {
                if (error) {
                    console.error('Error saving new post:', error);
                    return res.status(500).json({message: 'Something Went Wrong'});
                }

                try {
                    await PostController.setDraftPostToUserData(userData._id, savedPostData._id);
                    res.json({
                        //message: 'Post successfully created. After a moderator review',
                        postId: savedPostData._id,
                    });
                } catch (error) {
                    console.error('Error updating user draft post:', error);
                    return res.status(500).json({message: 'Something Went Wrong'});
                }
            });
        } catch (error) {
            console.error('Error creating new post:', error);
            return res.status(500).json({message: 'Something Went Wrong'});
        }
    }

    static async MetaSuggestion(req: Request, res: Response) {
        try {
            const type = {type: req.query?.type};
            const statusQuery = {status: 'published'};
            const size = 10;
            const startWithQuery =
                req.query?.startWith === 'any'
                    ? {}
                    : {
                        name: {
                            $regex: '^' + req.query?.startWith,
                            $options: 'i',
                        },
                    };
            await metaSchema
                .find({$and: [type, startWithQuery, statusQuery]}, 'name type', {
                    sort: {updatedAt: -1},
                })
                .limit(size)
                .exec()
                .then(metas => {
                    res.json({metas});
                })
                .catch(err => {
                    res.json({metas: []});
                });
        } catch (err) {
            console.log(err);
            res.end();
        }
    }

    static async checkDeletedVideo(req: Request, res: Response) {
        try {
            const {postId, mainThumbnail, videoEmbedCode} = req.body;
            const findQuery = postId ? {_id: postId} : mainThumbnail ? {mainThumbnail} : videoEmbedCode ? {videoEmbedCode} : null
            if (!findQuery) return res.status(400).json({message: 'No identifier was provided'});

            const post = await postSchema.findOne(
                findQuery,
                {
                    source: 1,
                    mainThumbnail: 1,
                    videoEmbedCode: 1,
                    status: 1,
                    _id: 0
                }
            ).lean().exec();

            if (!post) return res.status(404).json({message: 'Post not found'});
            if (post?.status !== 'published') return res.status(400).json({message: 'Post is not published'});

            const fieldToTest = post?.mainThumbnail || post?.videoEmbedCode || post?.source

            try {
                const response = await axios.get(fieldToTest);
                return res.json({
                    status: response.status,
                    checkedUrl: fieldToTest
                });
            } catch (error) {
                let statusCode = error.response ? error.response.status : 'Unknown';
                console.error(`${statusCode} Error fetching URL for ${fieldToTest}`, error.message);

                if (statusCode === 404) {
                    await postSchema.findOneAndUpdate(
                        findQuery,
                        {$set: {status: "trash"}}
                        , {timestamps: false}
                    );
                    console.log(`post ${postId} status changed to pending`);

                    if (fieldToTest === post?.mainThumbnail) {
                        const metasWithThisPostImage = await metaSchema.find({
                            imageUrl: post.mainThumbnail
                        });

                        if (metasWithThisPostImage?.length > 0) {
                            for await (const meta of metasWithThisPostImage) {
                                const postWithSameMeta = await postSchema
                                    .findOne({
                                        $and: [
                                            {[meta.type]: {$in: [meta.id]}},
                                            {mainThumbnail: {$exists: true}},
                                            {status: 'published'}
                                        ],
                                    })
                                    .select('mainThumbnail')
                                    .exec();

                                const metaCount = await postSchema
                                    .countDocuments({$and: [{[meta?.type]: {$in: meta?._id}}, {status: 'published'}]})
                                    .exec();

                                if (metaCount > 0 && !meta?.imageUrlLock) {
                                    await metaSchema.findByIdAndUpdate(
                                        meta._id,
                                        {
                                            $set: {
                                                imageUrl: postWithSameMeta.mainThumbnail,
                                            },
                                            $inc: {
                                                count: -1
                                            }
                                        }
                                    ).exec();
                                    // await metaSchema.findByIdAndUpdate(
                                    //     meta._id,
                                    //     {
                                    //         $set: {
                                    //             imageUrl: postWithSameMeta.mainThumbnail,
                                    //             count: metaCount
                                    //         }
                                    //     }).exec()
                                }
                                if (metaCount === 0) {
                                    await metaSchema
                                        .findByIdAndUpdate(meta?._id, {$set: {status: 'draft'}}, {timestamps: false})
                                        .exec();
                                }
                            }
                        }
                    }

                    return res.json({
                        status: statusCode,
                        error: `Failed to fetch URL for ${fieldToTest}`,
                        checkedUrl: fieldToTest
                    });
                } else {
                    return res.json({
                        status: statusCode,
                        error: `Failed to fetch URL for ${fieldToTest}`,
                        checkedUrl: fieldToTest
                    });
                }
            }


        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Something Went Wrong'});
        }
    }


    //---------------------Dashboard--------------------

    static async dashboardCreateNewPost(req: Request, res: Response) {
        const newPost = req.body.postData;

        try {
            const editedNewPost = {
                ...newPost,
                tags: newPost.tags ? await updateSaveMetas(newPost.tags) : [],
                categories: newPost.categories ? await updateSaveMetas(newPost.categories) : [],
                actors: newPost.actors ? await updateSaveMetas(newPost.actors) : [],
            };
            const newPostDataToSave = new postSchema(editedNewPost);
            newPostDataToSave
                .save()
                .then(savedPostData => {
                    res.json({savedPostData, message: 'Post Has Been Saved'});
                })
                .catch(error => {
                    console.log(error);
                    if (error.code === 11000) {
                        res.status(400).send({
                            message: 'Post with this TextInput already exist in the Database',
                            error,
                        });
                    } else {
                        return res.status(500).json({message: 'Something Went Wrong'});
                    }
                });
        } catch (error) {
            console.log(error);
            res.end();
        }
    }

    static async dashboardPostDataScrappers(req: Request, res: Response) {
        try {
            const urlToScrap = req.body.urlToScrap;

            if (urlToScrap.includes('xhamster')) {
                await xHScrapper(urlToScrap).then(urlData => {
                    res.json({urlData});
                });

                // res.end()
            } else {
                res.end();
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async dashboardFindAnotherSimilarSourceLink(req: Request, res: Response) {
        try {
            const postData = await postSchema.findById(req.query.postId).select('source');

            if (postData.source) {
                if (postData.source.includes('xhamster')) {
                    const relatedPosts = await xHSimilarFinder({
                        relatedBy: req.query.relatedBy as string,
                        page: parseInt(req.query.page as string),
                    });
                    res.status(200).json({relatedPosts});
                    return;
                }
            }

            res.status(200).json({relatedPosts: []});
            return;
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Something Went Wrong'});
        }
    }

    static async dashboardUpdatePost(req: Request, res: Response) {
        const postUpdatedData = req.body.postData;
        try {
            const finalPostUpdatedData = {
                ...postUpdatedData,
                lastModify: Date.now(),
                tags: postUpdatedData.tags ? await updateSaveMetas(postUpdatedData.tags) : [],
                categories: postUpdatedData.categories ? await updateSaveMetas(postUpdatedData.categories) : [],
                actors: postUpdatedData.actors ? await updateSaveMetas(postUpdatedData.actors) : [],
            };

            await postSchema
                .findByIdAndUpdate(postUpdatedData._id, {...finalPostUpdatedData}, {new: true})
                .exec()
                .then(updated => {
                    res.json({message: 'Post Has Been Successfully Updated'});
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({message: 'Error On Updating The document', err});
                });
        } catch (err) {
            console.log(err);
            return res.status(500).json({message: 'Something Went Wrong'});
        }
    }

    static async dashboardUpdatePosts(req: Request, res: Response) {
        const ids = req.body.ids || [];
        const status = req.body.status;
        let actions;

        if (status === 'delete') {
            actions = ids.map(async id => {
                return postSchema
                    .findByIdAndDelete(id)
                    .exec()
                    .then(doc => {
                        if (!doc.mainThumbnail.includes('http')) {
                            fs.unlinkSync(`.${doc.mainThumbnail}`);
                        }
                    });
            });
        } else {
            actions = ids.map(async id => {
                return postSchema.findByIdAndUpdate(id, {$set: {status}});
            });
        }
        Promise.all(actions)
            .then(() => {
                return res.status(200).json({
                    message: 'all done',
                });
            })
            .catch(err => {
                return res.status(500).json({message: 'Something Went Wrong'});
            });
    }

    static async dashboardBulkAction(req: Request, res: Response) {
        const type = req.body.type;
        const status = req.body.status;
        const ids = req.body.ids;
        let actionsPromise: {}[];

        const targetSchema =
            type === 'posts'
                ? postSchema
                : type === 'metas'
                    ? metaSchema
                    : type === 'comments'
                        ? commentSchema
                        : type === 'users'
                            ? userSchema
                            : null;
        if (status === 'delete') {
            actionsPromise = ids.map(id => {
                targetSchema.findByIdAndDelete(id);
            });
        } else {
            actionsPromise = ids.map((id: string) => {
                //@ts-ignore
                return targetSchema.findByIdAndUpdate(id, {$set: {status}});
            });
        }
        Promise.all(actionsPromise)
            .then(() => {
                return res.status(200).json({
                    message: 'all done',
                });
            })
            .catch(err => {
                return res.status(500).json({message: 'Something Went Wrong'});
            });
    }

    static async dashboardExportPosts(req: Request, res: Response) {
        const postType = req.body.data?.postType ? {postType: req.body.data.postType} : {};
        const metaId = req.body.data.metaId
            ? {
                $or: [{categories: req.body.data.metaId}, {tags: req.body.data.metaId}, {actors: req.body.data.metaId}],
            }
            : {};
        const author = req.body.data.author ? {author: req.body.data.author} : {};
        const limit = req.body.data.limit ? {limit: parseInt(req.body.data.limit)} : {};

        const options = {
            ...limit,
        };

        postSchema
            .find({$and: [postType, metaId, author]}, {}, options)
            .populate([{path: 'categories'}, {path: 'tags'}, {path: 'actors'}])
            .exec()
            .then(finalData => {
                res.json({exportedData: finalData});

                // const json = JSON.stringify(finalData);
                // const filename = 'posts.json';
                // const mimetype = 'application/json';
                // res.setHeader('Content-Type', mimetype);
                // res.setHeader('Content-disposition','attachment; filename='+filename);
                // res.json( json );
            })
            .catch(err => {
                res.status(500);
            });
    }

    static async dashboardGetPost(req: Request, res: Response) {
        const _id = req.query._id;
        try {
            if (_id) {
                postSchema
                    .findById(_id)
                    .populate([
                        {path: 'categories', select: {name: 1, type: 1}},
                        {path: 'tags', select: {name: 1, type: 1}},
                        {path: 'actors', select: {name: 1, type: 1}},
                        {
                            path: 'author', select: {
                                profileImage: 1,
                                username: 1,
                            }
                        },
                    ])
                    .exec()
                    .then(async post => {
                        const postMessageToSend = {post, error: false};
                        res.json(postMessageToSend);
                    })
                    .catch(err => {
                        res.status(404).json({message: 'not found'});
                    });
            } else {
                res.status(404).json({message: 'not found'});
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({message: 'Something Went Wrong'});
        }
    }

    static async dashboardGetPosts(req: Request, res: Response) {
        try {
            const {metaId, keyword, status, postType} = req.query;

            const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
            const metaQuery = metaId
                ? [{$or: [{categories: {$in: metaId}}, {tags: {$in: metaId}}, {actors: {$in: metaId}}]}]
                : [];
            const searchQuery = !decodedKeyword ? [] : [{
                $or: [
                    {title: new RegExp(decodedKeyword, 'i')},
                    {description: new RegExp(decodedKeyword, 'i')},
                    {mainThumbnail: new RegExp(decodedKeyword, 'i')},
                    {videoTrailerUrl: new RegExp(decodedKeyword, 'i')},
                    {videoUrl: new RegExp(decodedKeyword, 'i')},
                    {downloadLink: new RegExp(decodedKeyword, 'i')},
                    {iframe: new RegExp(decodedKeyword, 'i')},
                    {videoEmbedCode: new RegExp(decodedKeyword, 'i')},
                    {videoScriptCode: new RegExp(decodedKeyword, 'i')},
                ]
            }];
            const statusQuery = !status
                ? [{status: 'published'}]
                : status === 'all'
                    ? [{status: {$ne: 'trash'}}]
                    : [{status: status}];
            const postTypeQuery = postType && postType !== 'all' ? [{postType}] : [{}];
            const findQuery = {$and: [...metaQuery, ...searchQuery, ...statusQuery, ...postTypeQuery]};

            const populateOptions = [
                {path: 'author', select: ['username', 'profileImage', 'role']},
                {path: 'actors', select: {name: 1, type: 1}},
                {path: 'categories', select: {name: 1, type: 1, imageUrl: 1}},
                {path: 'tags', select: {name: 1, type: 1}},
                {path: 'thumbnail', select: {filePath: 1}},
            ];

            const totalCount = await postSchema.countDocuments(findQuery).exec();

            const posts = await postSchema.find(findQuery, null, reqQueryToMongooseOptions(req)).populate(populateOptions).exec();

            let statusesCount = {}

            for await (const status of postStatuses) {
                statusesCount[status] = await postSchema.countDocuments({status}).exec();
            }

            res.json({
                posts,
                totalCount,
                statusesCount
            });
        } catch (err) {
            console.log(err.stack);
            return res.status(404).json({
                message: 'Server Error',
            });
        }
    }

    static async dashboardCheckAndRemoveDeletedVideos(req: Request, res: Response) {
        res.end();
        if (isMainThread) {
            const worker = new Worker('./expressServer/workers/checkAndRemoveDeletedVideos.js', {workerData: {type: req.query.type}});

            worker.once('message', () => {
                worker.postMessage({exit: true});
            });

            worker.on('error', error => {
                console.log('error:', error);
            });

            worker.on('exit', exitCode => {
                console.log('exitCode : ', exitCode);
            });
        } else {
            parentPort.on('message', commandFromMainThread => {
                if (commandFromMainThread.exit) {
                    // process.exit(0);
                }
            });
        }
    }

    static async dashboardGeneratePermaLinkForPosts(req: Request, res: Response) {
        res.end();
        if (isMainThread) {
            const worker = new Worker('./expressServer/workers/generatePermaLink.js', {workerData: {}});

            worker.on('message', data => {
                // data.type === 'log' && console.log(data.message)

                if (data.exit) {
                    data.exit && worker.postMessage({exit: true});
                }
            });

            worker.on('error', error => {
                console.log('error:', error);
            });

            worker.on('exit', exitCode => {
                console.log('exitCode : ', exitCode);
            });
        } else {
            parentPort.on('message', commandFromMainThread => {
                if (commandFromMainThread.exit) {
                    console.log('terminating thread');
                    // process.exit(0);
                }
            });
        }
    }

    static async apiNewPost(req: Request, res: Response) {
        try {
            const newPost = req.body.postData;
            const hasDuplicate = await postSchema.exists({title: newPost.title});
            if (hasDuplicate) {
                return res.status(409).json({message: 'Duplicate document exists'});
            }

            const documentToSave = new postSchema({
                ...newPost,
                tags: newPost.tags ? await updateSaveMetas(newPost.tags) : [],
                categories: newPost.categories ? await updateSaveMetas(newPost.categories) : [],
                actors: newPost.actors ? await updateSaveMetas(newPost.actors) : [],
                // mainThumbnail: downloadImageContent ? await FileManagerController.downloadCreatedPostByApiThumbnail(newPost) : newPost.mainThumbnail
                mainThumbnail: newPost.mainThumbnail,
            });

            const savedDocument = await documentToSave.save();

            res.json({message: `${savedDocument.title} Has Been Saved : ${savedDocument._id} `});
        } catch (error) {
            res.status(500).json({message: 'Something Went Wrong'});
        }
    }

    static async apiUpdatePost(req: Request, res: Response) {
        try {
            const updatedPostData = req.body.updatedPostData;
            postSchema
                .findByIdAndUpdate(updatedPostData._id, updatedPostData)
                .exec()
                .then(() => {
                    res.json({message: updatedPostData._id + ' updated'});
                });
        } catch (err) {
            console.log(err);
        }
    }

    static async apiUpdateMeta(req: Request, res: Response) {
        try {
            const metaData = req.body.metaData;
            const findQuery = {$and: [{name: metaData.name}, {type: metaData.type}]};
            const existingMeta = await metaSchema.findOne(findQuery).exec();

            if (existingMeta) {
                metaSchema
                    .findByIdAndUpdate(existingMeta._id, {$set: {...metaData}}, {new: true})
                    .exec()
                    .then(updatedMeta => {
                        res.json({updated: updatedMeta, message: existingMeta?.name + ' updated'});
                    })
                    .catch(err => {
                        res.status(500).json({message: 'Error While Trying To Save New Meta From API', err});
                    });
            } else {
                const newMetaDataToSave = new metaSchema({
                    ...metaData,
                    count: 0,
                    status: 'draft',
                });
                await newMetaDataToSave.save((err, savedDocument) => {
                    if (err) {
                        res.status(500).json({message: 'Error While Trying To Save New Meta From API', err});
                    }
                    res.json({updated: savedDocument, message: savedDocument.name + ' created'});
                });
            }
        } catch (err) {
        }
    }
}

export default PostController;

// static async dashboardDeletePost(req: Request, res: Response) {
//     const _id = req.body._id;
//     postSchema
//         .findByIdAndDelete(_id)
//         .then(() => {
//             res.json({ message: `${_id} Deleted Permanently`, error: false });
//         })
//         .catch(() => {
//             res.json({
//                 message: `Can Not Delete ${_id} Something Went Wrong`,
//                 error: true,
//             });
//         });
// }

// const findingPostsOptions = _adminQueryGeneratorForGettingPosts({
//     ...req.query,
//     //@ts-ignore
//     size: !req.query.size ? cardAmountPerPage || 20 : parseInt(req.query.size),
//     page: !req.query.page ? 1 : parseInt(req.query.page),
// });

// static async updatePost(req: Request, res: Response) {
//     try {
//         const {_id} = req.body?.data
//
//         const postData = req.body?.data;
//
//         const post = await postSchema.findById(_id).lean().exec();
//
//         if (!postData) {
//             res.status(500).json({ message: 'Something Went Wrong', type: 'error' });
//         }
//
//         if (req.userData._id.toString() !== post?.author.toString()) {
//             res.status(403).json({
//                 message: 'You are not authorized to update this post',
//                 type: 'error',
//             });
//         }
//
//         const updatedPost = await postSchema
//             .findOneAndUpdate(
//                 { _id: postData?._id },
//                 { ...postData },
//                 {
//                     new: true,
//                     upsert: true,
//                 },
//             )
//             .exec();
//
//         if (postData.status !== 'draft'){
//             await userSchema.findByIdAndUpdate(req.userData._id, { $unset: { draftPost: 1 } }).exec();
//         }
//
//         res.status(200).json({
//             updatedPost,
//             message:
//                 postData?.status === 'draft'
//                     ? 'Saved'
//                     : postData?.status === 'trash'
//                         ? 'removed'
//                         : 'Your Updates Are Pending Moderator Approval',
//         });
//     } catch (error) {
//         console.log(error);
//         //@ts-ignore
//         res.status(500).json({ message: 'Something Went Wrong', type: 'error' });
//     }
// }

// static async checkPostExist(req: Request, res: Response) {
//     try {
//         const { _id } = req.query;
//         if (!_id) {
//             res.status(400).json({ message: 'No id provided' });
//         }
//         const exist = await postSchema.exists({ _id }).exec();
//
//         res.json({ exist });
//     } catch (error) {}
// }