// @ts-nocheck
import { Response, Request } from 'express';
import { mongoIdValidator } from '@util/data-validators';
import postSchema from '@schemas/postSchema';
import searchKeywordSchema from '@schemas/searchKeywordSchema';
import metaSchema from '@schemas/metaSchema';
import _clientQueryGeneratorForGettingPosts from '@util/_clientQueryGeneratorForGettingPosts';
import { postFieldRequestForCards } from '@repo/data-structures';
import userSchema from '@schemas/userSchema';
import mongoose from 'mongoose';
import commentSchema from '@schemas/commentSchema';
import { randomNumberGenerator } from '@util/math-util';
import { isEmptyObject } from '@util/object-util';
import { findMetas } from '@_variables/serverGlobalVariable/findMetas';
import { multiQueryUniquer } from '@util/queryUtil';
import { Post } from 'typescript-types';
import { reqQueryToMongooseOptions } from '@util/database-util';
import updateSaveMetas from '@util/_updateSaveMetas';
import xHScrapper from '@util/scrappers/xHScrapper';
import xHSimilarFinder from '@util/scrappers/xHSimilarFinder';
import fs from 'fs';
import _adminQueryGeneratorForGettingPosts from "@util/_adminQueryGeneratorForGettingPosts";
import {isMainThread, parentPort, Worker} from "worker_threads";
import path from "path";
import FileManagerController from "./FileManagerController";

class PostController {
    //---------------------helpers-------------------
    static async findRelatedPosts(post: Post) {
        try {
            const relatedByFields = ['actors', 'categories', 'tags'];
            return await postSchema.findRelatedPosts({ post, relatedByFields, limit: 8 });
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    static async saveSearchedKeyword(keyword: string, postsCount: number) {
        if (!keyword) return;
        try {
            await searchKeywordSchema
                .findOneAndUpdate(
                    { name: keyword },
                    {
                        $set: {
                            name: keyword,
                            count: postsCount,
                        },
                        $inc: { searchHits: 1 },
                    },
                    { upsert: true },
                )
                .exec();
        } catch (error) {
            console.log('error=> ', error);
        }
    }

    static async getMetaForGettingPostsRequest(meta: string) {
        try {
            if (mongoIdValidator(meta)) {
                return await metaSchema.findById(meta).exec();
            } else {
                return await metaSchema.findOne({
                    name: { $regex: decodeURIComponent(meta), $options: 'i' },
                });
            }
        } catch (err) {
            return {};
        }
    }

    static findPostQueryGenerator(req: Request) {
        const hasId = req.query?._id && mongoIdValidator(multiQueryUniquer(req.query?._id));
        const decodeTitle =
            req.query?.title && decodeURIComponent(multiQueryUniquer(req.query?.title));

        return hasId
            ? { _id: req.query._id }
            : decodeTitle
              ? { $or: [{ title: decodeTitle }, { permaLink: decodeTitle?.replaceAll(' ', '-') }] }
              : null;
    }

    static async setDraftPostToUserData(userId: string, draftPostId: string) {
        try {
            return await userSchema
                .findByIdAndUpdate(userId, { $set: { draftPost: draftPostId } }, { new: true })
                .exec();
        } catch (error) {
            console.error('Error updating user draft post:', error);
            throw error;
        }
    }

    static async findPostsWithDuplicatedMeta(duplicate: any[]) {
        try {
            let metasWithCount = [];

            for await (const item of duplicate.ids) {
                const postsWithThisMeta = await postSchema
                    .countDocuments({
                        $or: [{ categories: item }, { tags: item }, { actors: item }],
                    })
                    .exec();
                metasWithCount.push({ _id: item, count: postsWithThisMeta });
            }

            const highestCountMeta = Math.max(...metasWithCount.map(item => item.count));
            const itemWithHighestCount = metasWithCount.find(
                item => item.count === highestCountMeta,
            );
            const itemsToRemoveFromPosts = metasWithCount.filter(
                meta => meta._id !== itemWithHighestCount._id,
            );

            for await (const wrongMeta of itemsToRemoveFromPosts) {
                const postWithWrongMeta = await postSchema
                    .find({ [duplicate._id.type]: wrongMeta._id })
                    .exec();

                for await (const post of postWithWrongMeta) {
                    await postSchema
                        .findByIdAndUpdate(
                            post._id,
                            {
                                $pull: {
                                    [duplicate._id.type]: wrongMeta._id,
                                },
                            },
                            { new: true },
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
                            { new: true },
                        )
                        .exec();
                }

                await metaSchema.findByIdAndDelete(wrongMeta?._id).exec();
            }
        } catch (error) {}
    }




    //---------------------client--------------------
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
                            populate: { path: 'profileImage', model: 'file' },
                        },
                        { path: 'categories', select: { name: 1, type: 1 } },
                        { path: 'images', select: { filePath: 1 }, model: 'file' },
                        { path: 'tags', select: { name: 1, type: 1 } },
                        { path: 'actors', select: { name: 1, type: 1, imageUrl: 1 } },
                    ])
                    .exec();

                if (post) {
                    const relatedPosts = await PostController.findRelatedPosts(post);
                    res.json({
                        post,
                        relatedPosts,
                        error: false,
                    });
                } else {
                    res.status(404).json({ message: 'not found' });
                }
            } else {
                res.status(404).json({ message: 'not found' });
            }
        } catch (err) {
            console.error(err, 'get post error');
            res.status(500).json({ message: 'Something went wrong please try again later' });
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
                            populate: { path: 'profileImage', model: 'file' },
                        },
                        { path: 'categories', select: { name: 1, type: 1 } },
                        { path: 'images', select: { filePath: 1 }, model: 'file' },
                        { path: 'tags', select: { name: 1, type: 1 } },
                        { path: 'actors', select: { name: 1, type: 1, imageUrl: 1 } },
                        // {
                        //     path: 'uniqueData.attenders',
                        //     select: { username: 1, profileImage: 1, role: 1 },
                        // },
                    ])
                    .exec();

                if (post) {
                    res.json({
                        post,
                    });
                } else {
                    res.status(404).json({ message: 'not found' });
                }
            } else {
                res.status(404).json({ message: 'not found' });
            }
        } catch (err) {
            console.error(err, 'get post error');
            res.status(500).json({ message: 'Something went wrong please try again later' });
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
                res.status(404).json({ message: 'not found' });
            }
        } catch (err) {
            console.error(err, 'get post error');
            res.status(500).json({ message: 'Something went wrong please try again later' });
        }
    }

    static async getPostRating(req: Request, res: Response) {
        try {
            const findQuery = PostController.findPostQueryGenerator(req);

            const postData = await postSchema
                .findOne(findQuery)
                .select(['likes', 'disLikes'])
                .exec();

            if (postData) {
                res.status(200).json({
                    likes: postData?.likes,
                    disLikes: postData?.disLikes,
                });
            } else {
                res.status(404).json({ message: 'not found' });
            }
        } catch (err) {
            console.error(err, 'get post error');
            res.status(500).json({ message: 'Something went wrong please try again later' });
        }
    }

    static async getPosts(req: Request, res: Response) {
        try {
            const locale = req.query.locale;
            const metaIdentifier = req.query?.metaId
                ? multiQueryUniquer(req.query?.metaId)
                : req.query?.selectedMetaForPosts
                  ? multiQueryUniquer(req.query?.selectedMetaForPosts)
                  : null;
            const meta = metaIdentifier
                ? (await PostController.getMetaForGettingPostsRequest(metaIdentifier)) || {}
                : {};

            const findingPostsOptions = _clientQueryGeneratorForGettingPosts(
                {
                    ...req.query,
                    //@ts-ignore
                    size:
                        req.query.size === 'undefined'
                            ? global?.initialSettings?.layoutSettings?.numberOfCardsPerPage || 20
                            : parseInt(req.query.size),
                    page: req.query.page === 'undefined' ? 1 : parseInt(req.query.page),
                    //@ts-ignore
                },
                meta?._id,
            );

            const totalCount = await postSchema
                .countDocuments(findingPostsOptions.findPostsQueries)
                .exec();

            const posts = await postSchema
                .find(
                    findingPostsOptions.findPostsQueries,
                    findingPostsOptions.selectedFields,
                    reqQueryToMongooseOptions(req),
                )
                // .find(findingPostsOptions.findPostsQueries, findingPostsOptions.selectedFields, {
                //     skip:
                //         findingPostsOptions.size * findingPostsOptions.page -
                //         findingPostsOptions.size,
                //     limit: findingPostsOptions.size,
                //     sort: findingPostsOptions.sortQuery,
                // })
                .select([...postFieldRequestForCards, `translations.${locale}.title`])
                // .populate(populateMeta)
                .exec();
            if (req.query?.keyword && totalCount > 0) {
                await saveSearchedKeyword(req.query?.keyword, totalCount);
            }

            res.json({ posts, totalCount, meta });
        } catch (err) {
            console.log(err.stack);
            return res.status(503).json({
                message: 'Server Error',
            });
        }
    }

    static async getUserPagePosts(req: Request, res: Response) {
        try {
            const authorId = req.query.authorId;
            const skip = req.query.skip || 0;

            const posts = await postSchema
                .find(
                    { $and: [{ author: authorId }, { status: req.query.status || 'published' }] },
                    [...postFieldRequestForCards, 'status'],
                    {
                        skip: skip,
                        limit: global?.initialSettings?.layoutSettings?.numberOfCardsPerPage || 20,
                    },
                )
                .exec();

            res.json({ posts });
        } catch (error) {
            console.log(error.stack);
            res.status(503).json({
                message: 'Server Error',
            });
        }
    }

    static async searchPosts(req: Request, res: Response) {
        if (!req.query.keyword) {
            res.status(400).json({ message: 'Bad Request' });
            return;
        }
        try {
            const locale = req.query.locale;

            const decodedKeyword = req.query.keyword ? decodeURIComponent(req.query.keyword) : '';
            const keyword = decodedKeyword.toLowerCase();

            const size = req.query.size ? (req.query.size > 100 ? 100 : 20) : 20;
            const page = req.query.page ? req.query.page : 20;

            let postsTranslationsSearchQuery = [];
            let metasTranslationsSearchQuery = [];

            for await (const locale of locals) {
                metasTranslationsSearchQuery.push({
                    [`translations.${locale}.name`]: new RegExp(keyword, 'i'),
                });
            }
            for await (const locale of locals) {
                postsTranslationsSearchQuery.push({
                    [`translations.${locale}.title`]: new RegExp(keyword, 'i'),
                });
                postsTranslationsSearchQuery.push({
                    [`translations.${locale}.description`]: new RegExp(keyword, 'i'),
                });
            }

            const postSearchQuery = {
                $and: [
                    {
                        $or: [
                            { title: new RegExp(keyword, 'i') },
                            { description: new RegExp(keyword, 'i') },
                            ...postsTranslationsSearchQuery,
                        ],
                    },
                    { status: 'published' },
                ],
            };

            const metasSearchQuery = {
                $and: [
                    { $or: [{ name: new RegExp(keyword, 'i') }, ...metasTranslationsSearchQuery] },
                    { status: 'published' },
                ],
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
                await saveSearchedKeyword({
                    keyword,
                    postsCount: totalCount,
                });
            }

            res.json({
                posts,
                totalCount,
                metas,
            });
        } catch (err) {
            res.status(500).json({ message: 'Server Error' });
        }
    }

    static async deletePost(req: Request, res: Response) {
        try {
            if (!req.query._id) {
                return res.status(400).json({
                    message: 'Bad Request',
                });
            }

            const userData = req.userData;
            const _id = req.query._id;

            const postData = await postSchema.findById(_id).select('author').lean().exec();


            if (postData.author !== userData._id) {
                return res.status(401).json({
                    message: 'Unauthorized',
                });
            }

            await postSchema.findByIdAndDelete(_id).exec();
            await userSchema
                .findByIdAndUpdate(req.userData._id, { $unset: { draftPost: 1 } })
                .exec();

            res.status(200).json({ message: 'Post Deleted Successfully' });
        } catch (error) {}
    }

    static async likeDislikeView(req: Request, res: Response) {
        postSchema
            .findByIdAndUpdate(
                req.body.id,
                { $inc: { [req.body.type]: 1 } },
                {
                    new: true,
                    timestamps: false,
                },
            )
            .select(' likes , disLikes , views ')
            .exec()
            .then(updatedData => {
                res.json({ updatedData });
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
            let postIncQuery = { [type]: 0, [oppositeType]: 0 };

            if (oppositeDone) {
                userUpdateQuery = {
                    $pull: { [oppositeField]: postId },
                    $addToSet: { [userField]: postId },
                };
                postIncQuery[type] = 1;
                postIncQuery[oppositeType] = -1;
            } else if (alreadyDone) {
                userUpdateQuery = { $pull: { [userField]: postId } };
                postIncQuery[type] = -1;
            } else {
                userUpdateQuery = { $addToSet: { [userField]: postId } };
                postIncQuery[type] = 1;
            }

            // Update user
            await userSchema.findByIdAndUpdate(userId, userUpdateQuery);

            // Update post
            const updatedPost = await postSchema.findByIdAndUpdate(
                postId,
                { $inc: postIncQuery },
                { new: true },
            );

            res.status(200).json({
                likes: updatedPost.likes,
                disLikes: updatedPost.disLikes,
            });
        } catch (error) {
            console.log('error=> ', error);
            res.status(500).send('Internal Server Error');
        }
    }







    static async newPost(req: Request, res: Response) {
        try {
            const userData = await userSchema.findById(req.userData._id).select('draftPost').exec();


            // const unFinishedPostsCount = await postSchema
            //     .countDocuments({
            //         $and: [
            //             { $or: [{ $ne: { status: 'published' } }, { $ne: { status: 'trash' } }] },
            //             { author: req.userData._id },
            //         ],
            //     })
            //     .exec();


            if (userData?.draftPost) {
                res.json({
                    message: 'There Is An Existing Draft Post.',
                    newPostId: userData.draftPost,
                });
            } else {
                const newPostDataToSave = new postSchema(req.body.data);
                newPostDataToSave.save(async (error: any, savedPostData: { _id: any }) => {
                    if (error) {
                        console.error('Error saving new post:', error);
                        return res
                            .status(500)
                            .json({ message: 'Something Went Wrong', type: 'error' });
                    }

                    try {
                        await PostController.setDraftPostToUserData(
                            userData._id,
                            savedPostData._id,
                        );
                        res.json({
                            message: 'Post successfully created. After a moderator review',
                            newPostId: savedPostData._id,
                        });
                    } catch (e) {
                        console.error('Error updating user draft post:', e);
                        res.status(500).json({ message: 'Something Went Wrong', type: 'error' });
                    }
                });
            }
        } catch (error) {
            console.error('Error creating new post:', error);
            res.status(500).json({ message: 'Something Went Wrong', type: 'error' });
        }
    }

    static async MetaSuggestion(req: Request, res: Response) {
        try {
            const type = { type: req.query?.type };
            const statusQuery = { status: 'published' };
            const size = 10;
            const startWithQuery =
                req.query?.startWith === 'any'
                    ? {}
                    : { name: { $regex: '^' + req.query?.startWith, $options: 'i' } };
            await metaSchema
                .find({ $and: [type, startWithQuery, statusQuery] }, 'name type', {
                    sort: { updatedAt: -1 },
                })
                .limit(size)
                .exec()
                .then(metas => {
                    res.json({ metas });
                })
                .catch(err => {
                    res.json({ metas: [] });
                });
        } catch (err) {
            console.log(err);
            res.end();
        }
    }

    static async updatePost(req: Request, res: Response) {
        try {
            const postData = req.body?.data;
            if (!postData) res.status(500).json({ message: 'Something Went Wrong', type: 'error' });

            const userId = new mongoose.Types.ObjectId(req.userData._id);
            const authorId = new mongoose.Types.ObjectId(postData?.author);
            const isAuthorizedToUpdate =
                userId.toString() === authorId.toString() || req.userData.role === 'administrator';

            if (!isAuthorizedToUpdate) {
                res.status(403).json({
                    message: 'You are not authorized to update this post',
                    type: 'error',
                });
            }

            const updatedPost = await postSchema
                .findOneAndUpdate(
                    { _id: postData?._id },
                    { ...postData },
                    {
                        new: true,
                        upsert: true,
                    },
                )
                .exec();

            await userSchema
                .findByIdAndUpdate(req.userData._id, { $unset: { draftPost: 1 } })
                .exec();

            res.status(200).json({
                updatedPost,
                message:
                    postData?.status === 'draft'
                        ? 'Saved'
                        : postData?.status === 'trash'
                          ? 'removed'
                          : 'Your Updates Are Pending Moderator Approval',
            });
        } catch (error) {
            console.log(error);
            //@ts-ignore
            res.status(500).json({ message: 'Something Went Wrong', type: 'error' });
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
                    res.json({ savedPostData, message: 'Post Has Been Saved' });
                })
                .catch(error => {
                    console.log(error);
                    if (error.code === 11000) {
                        res.status(400).send({
                            message: 'Post with this TextInput already exist in the Database',
                            error,
                        });
                    } else {
                        res.status(500).send({
                            message: 'Something Went Wrong While Saving The Post',
                            error,
                        });
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
                    res.json({ urlData });
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
                    res.status(200).json({ relatedPosts });
                    return;
                }
            }

            res.status(200).json({ relatedPosts: [] });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async dashboardUpdatePost(req: Request, res: Response) {
        const postUpdatedData = req.body.postData;

        try {
            const finalPostUpdatedData = {
                ...postUpdatedData,
                lastModify: Date.now(),
                tags: postUpdatedData.tags ? await updateSaveMetas(postUpdatedData.tags) : [],
                categories: postUpdatedData.categories
                    ? await updateSaveMetas(postUpdatedData.categories)
                    : [],
                actors: postUpdatedData.actors ? await updateSaveMetas(postUpdatedData.actors) : [],
            };

            await postSchema
                .findByIdAndUpdate(postUpdatedData._id, { ...finalPostUpdatedData }, { new: true })
                .exec()
                .then(updated => {
                    res.json({ message: 'Post Has Been Successfully Updated' });
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({ message: 'Error On Updating The document', err });
                });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'I Tried But Something Went Wrong', err });
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
                return postSchema.findByIdAndUpdate(id, { $set: { status } });
            });
        }
        Promise.all(actions)
            .then(() => {
                return res.status(200).json({
                    message: 'all done',
                });
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'Server Error',
                });
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
                return targetSchema.findByIdAndUpdate(id, { $set: { status } });
            });
        }
        Promise.all(actionsPromise)
            .then(() => {
                return res.status(200).json({
                    message: 'all done',
                });
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'Server Error',
                });
            });
    }

    static async dashboardExportPosts(req: Request, res: Response) {
        const postType = req.body.data?.postType ? { postType: req.body.data.postType } : {};
        const metaId = req.body.data.metaId
            ? {
                  $or: [
                      { categories: req.body.data.metaId },
                      { tags: req.body.data.metaId },
                      { actors: req.body.data.metaId },
                  ],
              }
            : {};
        const author = req.body.data.author ? { author: req.body.data.author } : {};
        const limit = req.body.data.limit ? { limit: parseInt(req.body.data.limit) } : {};

        const options = {
            ...limit,
        };

        postSchema
            .find({ $and: [postType, metaId, author] }, {}, options)
            .populate([{ path: 'categories' }, { path: 'tags' }, { path: 'actors' }])
            .exec()
            .then(finalData => {
                res.json({ exportedData: finalData });

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
                        { path: 'categories', select: { name: 1, type: 1 } },
                        { path: 'tags', select: { name: 1, type: 1 } },
                        { path: 'actors', select: { name: 1, type: 1 } },
                    ])
                    .exec()
                    .then(async post => {
                        const postMessageToSend = { post, error: false };
                        res.json(postMessageToSend);
                    })
                    .catch(err => {
                        res.status(404).json({ message: 'not found' });
                    });
            } else {
                res.status(404).json({ message: 'not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Something went wrong please try again later' });
        }
    }

    static async dashboardGetPosts(req: Request, res: Response){

        try {

            const findingPostsOptions = _adminQueryGeneratorForGettingPosts({
                ...req.query,
                //@ts-ignore
                size: !req.query.size
                    ? global?.initialSettings?.layoutSettings
                    ?.numberOfCardsPerPage || 20
                    : parseInt(req.query.size),
                page: !req.query.page ? 1 : parseInt(req.query.page),
            });

            const populateMeta = [
                { path: 'author', select: ['username', 'profileImage', 'role'] },
                { path: 'actors', select: { name: 1, type: 1 } },
                { path: 'categories', select: { name: 1, type: 1, imageUrl: 1 } },
                { path: 'tags', select: { name: 1, type: 1 } },
            ];

            const totalCount = await postSchema
                .countDocuments(findingPostsOptions.findPostsQueries)
                .exec();

            const posts = await postSchema
                .find(
                    findingPostsOptions.findPostsQueries,
                    findingPostsOptions.selectedFields,
                    reqQueryToMongooseOptions(req)
                    // {
                    //     skip:
                    //         findingPostsOptions.size * findingPostsOptions.page -
                    //         findingPostsOptions.size,
                    //     limit: findingPostsOptions.size,
                    // },
                )
                //@ts-ignore
                .sort(findingPostsOptions.sortQuery)
                .populate(populateMeta)
                .exec();

            const meta =
                req.query?.metaId || req.query?.selectedMetaForPosts
                    ? await metaSchema
                        .findById(
                            req.query?.metaId || req.query?.selectedMetaForPosts,
                        )
                        .exec()
                    : {};

            res.json({ posts, totalCount, meta });
        } catch (err) {
            console.log(err.stack);
            return res.status(404).json({
                message: 'Server Error',
            });
        }
    };

    static async dashboardCheckAndRemoveDeletedVideos(req: Request, res: Response){
        res.end()
        if (isMainThread){
            const worker = new Worker(
                './expressServer/workers/checkAndRemoveDeletedVideos.js',
                {workerData:{type:req.query.type}}
            )

            worker.once('message',() =>{
                worker.postMessage({ exit: true })
            })

            worker.on('error', error => {
                console.log('error:',error);
            });

            worker.on('exit', exitCode => {
                console.log('exitCode : ',exitCode);
            })
        }else{
            parentPort.on("message", (commandFromMainThread) => {
                if (commandFromMainThread.exit) {
                    process.exit(0);
                }
            });
        }
    }

    static async dashboardGeneratePermaLinkForPosts(req: Request, res: Response){
        res.end()
        if (isMainThread) {
            const worker = new Worker(
                './expressServer/workers/generatePermaLink.js',
                {workerData: {}}
            )

            worker.on('message', (data) => {
                // data.type === 'log' && console.log(data.message)

                if (data.exit) {
                    data.exit && worker.postMessage({exit: true})
                }
            });

            worker.on('error', error => {
                console.log('error:', error);
            });

            worker.on('exit', exitCode => {
                console.log('exitCode : ', exitCode);
            })
        } else {
            parentPort.on("message", (commandFromMainThread) => {
                if (commandFromMainThread.exit) {
                    console.log('terminating thread')
                    process.exit(0);
                }
            });
        }
    }

    static async apiNewPost(req: Request, res: Response){
        try {
            const newPost = req.body.postData
            const hasDuplicate = await postSchema.exists({title: newPost.title})
            if (hasDuplicate){
                return res.status(409).json({ message: 'Duplicate document exists' });
            }

            const documentToSave = new postSchema({
                ...newPost,
                tags: newPost.tags ? await updateSaveMetas(newPost.tags) : [],
                categories: newPost.categories ? await updateSaveMetas(newPost.categories) : [],
                actors: newPost.actors ? await updateSaveMetas(newPost.actors) : [],
                mainThumbnail: downloadImageContent ? await FileManagerController.downloadCreatedPostByApiThumbnail(newPost) : newPost.mainThumbnail
            })

            const savedDocument = await documentToSave.save()

            res.json({message: `${savedDocument.title} Has Been Saved : ${savedDocument._id} `})

        }catch (error){
            res.status(500).json({ message: 'Something Went Wrong' });
        }
    }

    static async  apiUpdatePost(req: Request, res: Response){
        try {
            const updatedPostData = req.body.updatedPostData
            postSchema.findByIdAndUpdate(updatedPostData._id, updatedPostData).exec().then(() => {
                res.json({message: updatedPostData._id + ' updated'})
            })

        } catch (err) {
            console.log(err)
        }
    }

    static async apiUpdateMeta(req: Request, res: Response){
        try {
            const metaData = req.body.metaData;
            const findQuery = {$and:[{name: metaData.name},{type: metaData.type}]}
            const existingMeta =  await  metaSchema.findOne(findQuery).exec()

            if (existingMeta){
                metaSchema.findByIdAndUpdate(existingMeta._id, {$set:{...metaData}}, {new: true})
                    .exec()
                    .then(updatedMeta => {
                        res.json({updated: updatedMeta,message: existingMeta?.name + ' updated'})
                    }).catch(err => {
                    res.status(500).json({message:'Error While Trying To Save New Meta From API',err})
                })
            }
            else {
                const newMetaDataToSave = new metaSchema({
                    ...metaData,
                    count:0,
                    status:'draft'
                })
                await newMetaDataToSave.save((err, savedDocument) => {
                    if (err) {
                        res.status(500).json({message: 'Error While Trying To Save New Meta From API', err})
                    }
                    res.json({updated: savedDocument, message: savedDocument.name + ' created'})
                })
            }
        }catch (err){

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