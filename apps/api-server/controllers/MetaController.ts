// @ts-nocheck
import { Request, Response } from 'express';
import metaSchema from '@schemas/metaSchema';
import postSchema from '@schemas/postSchema';
import { randomNumberGenerator } from '@util/math-util';
import { isEmptyObject } from '@util/object-util';
import { findMetas } from '@_variables/serverGlobalVariable/findMetas';
import { isMainThread, parentPort, Worker } from 'worker_threads';
import path from 'path';
import { multiQueryUniquer } from '@util/queryUtil';
import { mongoIdValidator } from '@util/data-validators';

import { reqQueryToMongooseOptions,searchQueryGenerator } from '@util/database-util';
import { postStatuses } from '@repo/data-structures';

const dev = process.env.NODE_ENV !== 'production';

class MetaController {
    static async resetMetaImage(req: Request, res: Response) {
        try {
            const metaId = req.body._id;
            const metaDocument = await metaSchema.findById(metaId).exec();
            const metaCount = await postSchema
                .countDocuments({
                    $and: [{ [metaDocument.type]: metaDocument._id }, { status: 'published' }],
                })
                .exec();
            const randomSkip = randomNumberGenerator(1, metaCount);

            if (!isEmptyObject(metaDocument) && !metaDocument?.imageUrlLock) {
                const findPostWithSameMeta = await postSchema
                    .findOne({
                        $and: [{ [metaDocument.type]: metaDocument._id }, { status: 'published' }],
                    })
                    .skip(randomSkip)
                    .exec();
                if (findPostWithSameMeta) {
                    await metaSchema
                        .findByIdAndUpdate(metaId, { imageUrl: findPostWithSameMeta.mainThumbnail }, { new: true })
                        .exec()
                        .then(updatedMeta => {
                            res.json({ newImageUrl: updatedMeta.imageUrl });
                        })
                        .catch(err => {
                            console.log(err);
                            res.end();
                        });
                } else {
                    res.end();
                }
            } else {
                res.json({ newImageUrl: metaDocument?.imageUrl });
            }
        } catch (err) {
            console.log(err);
            res.end();
        }
    }

    static async getMetas(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const resultMetaFindQueries = await findMetas({ ...req.query, page });

            res.json({ ...resultMetaFindQueries });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Something Went Wrong' });
        }
    }

    // static async getMeta(req: Request, res: Response) {
    //     try {
    //         const { _id } = req.query;
    //
    //         if (!mongoIdValidator(multiQueryUniquer(_id))) {
    //             res.status(400).json({ message: 'invalid id' });
    //         }
    //
    //         if (!_id) {
    //             res.status(400).json({ message: 'No meta id provided' });
    //         }
    //
    //         const meta = await metaSchema.findById(_id).exec();
    //
    //         if (!meta || meta.status !== 'published') {
    //             res.status(404).json({ message: 'Meta not found' });
    //         }
    //
    //         res.json({ meta });
    //     } catch (err) {
    //         console.error(err);
    //         return res.status(500).json({ message: 'Something Went Wrong' });
    //     }
    // }

    static async getTags(req: Request, res: Response) {
        try {
            const statusQuery = { status: 'published' };
            const startWithNumberRegex = /^[0-9]/g;

            const startWithQuery = !req.query.startWith
                ? {}
                : req.query.startWith === 'other'
                  ? { name: { $regex: startWithNumberRegex } }
                  : { name: { $regex: '^' + req.query.startWith } };

            const countQuery = { count: { $gt: 0 } };
            const type = { type: 'tags' };

            const sortQuery = !req.query.sort
                ? {
                      // 'rank': 1,
                      count: -1,
                  }
                : { [req.query?.sort as string]: -1 };

            if (req.query.startWith) {
                const findQuery = {
                    $and: [type, startWithQuery, statusQuery, countQuery],
                };
                const metas = await metaSchema.find(findQuery, {}, { sort: sortQuery }).select('name type').exec();

                res.status(200).json({ metas });
            } else {
                const findQuery = { $and: [type, statusQuery, countQuery] };
                const metas = await metaSchema
                    .find(findQuery, {}, { sort: sortQuery })
                    .limit(500)
                    .select('name type')
                    .exec();

                res.status(200).json({ metas });
            }
        } catch (err) {
            console.log(err);
            res.end();
        }
    }

    static async dashboardUpdateMeta(req: Request, res: Response) {
        try {
            const metaData = req.body.data;

            if (!metaData) {
                return res.status(400).json({ message: 'No meta data provided' });
            }

            if (metaData._id) {
                await metaSchema.syncIndexes();
                try {
                    const updatedMeta = await metaSchema
                        .findByIdAndUpdate(metaData._id, { ...metaData }, { new: true })
                        .exec();

                    return res.json({ updated: updatedMeta, message: 'updated' });
                } catch (err) {
                    console.error('Error While Trying To Update Meta:', err);
                    return res.status(500).json({ message: 'Something Went Wrong' });
                }
            } else {
                try {
                    const metaToSave = new metaSchema(metaData);
                    const savedMeta = await metaToSave.save();
                    return res.json({ updated: savedMeta, message: 'updated' });
                } catch (err) {
                    console.error('Error While Trying To Save Meta:', err);
                    return res.status(500).json({ message: 'Something Went Wrong' });
                }
            }
        } catch (error) {
            console.error('General Error:', error);
            return res.status(500).json({ message: 'Something Went Wrong' });
        }
    }

    static async mergeDuplicateMeta(req: Request, res: Response) {
        const duplicates = await metaSchema.aggregate([
            {
                $group: {
                    _id: { name: '$name', type: '$type' },
                    count: { $sum: 1 },
                    docs: { $push: '$$ROOT' },
                },
            },
            {
                $match: {
                    count: { $gt: 1 },
                },
            },
        ]);

        for await (const group of duplicates) {
            const docs = group.docs;

            docs.sort((a, b) => b.count - a.count);

            const [docToKeep, ...docsToRemove] = docs;

            for await (const meta of docsToRemove) {
                await postSchema
                    .updateMany(
                        { [meta?.type]: { $in: [meta._id] } },
                        {
                            $push: { [docToKeep.type]: docToKeep._id },
                        },
                    )
                    .exec();

                await postSchema
                    .updateMany(
                        { [meta?.type]: { $in: [meta._id] } },
                        {
                            $pull: { [meta?.type]: meta._id },
                        },
                    )
                    .exec();

                await metaSchema.findByIdAndDelete(meta._id as unknown, { useFindAndModify: false }).exec();
            }

            console.log(`Kept document: ${docToKeep._id} with ${docToKeep.posts} posts`);
            console.log(`Removed ${docsToRemove.length} duplicates`);
        }
        res.json({ message: 'duplicates', duplicates });
    }

    static async dashboardDeleteMeta(req: Request, res: Response) {
        try {
            const { metaIds } = req.query;

            if (!metaIds) {
                res.status(400).json({ message: 'No ids was provided' });
                return;
            }
            const idsArray = Array.isArray(metaIds) ? metaIds : [metaIds];
            for await (const metaId of idsArray) {
                const meta = await metaSchema.findById(metaId).exec();
                if (meta) {
                    await postSchema
                        .updateMany(
                            { [meta?.type]: { $in: [meta._id] } }, // Find all posts with the specified meta ID
                            { $pull: { [meta?.type]: meta._id } }, // Remove the specified meta ID from the array
                        )
                        .exec();
                    await metaSchema.findByIdAndDelete(meta._id as unknown, { useFindAndModify: false }).exec();
                    console.log(`${meta.name} was deleted`);
                }
            }
            res.json({ message: 'Metas Deleted' });
        } catch (error) {
            return res.status(500).json({ message: 'Something Went Wrong' });
        }
    }

    static async dashboardGetMeta(req: Request, res: Response) {
        try {
            const metaId = multiQueryUniquer(req.query.metaId);

            const isValidId = mongoIdValidator(metaId);

            if (!metaId) {
                res.status(400).json({ message: 'No ID provided' });
                return;
            }

            if (!isValidId) {
                res.status(400).json({ message: 'Invalid ID provided' });
                return;
            }

            const meta = await metaSchema.findById(metaId).exec();

            if (meta) {
                res.json({ meta });
            } else {
                res.status(404).json({ message: 'Not Found' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Something Went Wrong' });
        }
    }

    static async dashboardGetMetas(req: Request, res: Response) {
        try {
            const { metaType, status, keyword } = req.query;
            //@ts-ignore
            const { isAdmin } = req.userData;

            if (!metaType) {
                res.status(400).json({ message: 'No metaType provided' });
                return;
            }

            const type = { type: req.query?.metaType };

            const statusQuery =
                req.query.status === 'all'
                    ? { status: { $ne: 'trash' } }
                    : !req.query.status
                      ? {}
                      : { status: req.query.status };

            const searchQuery = searchQueryGenerator(multiQueryUniquer(keyword), isAdmin);

            const metaCount = await metaSchema
                .countDocuments({ $and: [{ type: multiQueryUniquer(metaType) }, searchQuery, statusQuery] })
                .exec();

            let statusesCount = {};

            for await (const status of postStatuses) {
                statusesCount[status] = await metaSchema.countDocuments({ $and: [{ status }, type] }).exec();
            }

            const metas = await metaSchema
                .find({ $and: [type, searchQuery, statusQuery] }, {}, reqQueryToMongooseOptions(req))
                .exec();

            res.json({ metas, totalCount: metaCount, statusesCount });

            // await metaSchema
            //     .find({ $and: [type, searchQuery, statusQuery] }, {}, reqQueryToMongooseOptions(req))
            //     .exec()
            //     .then(async metas => {
            //         res.json({ metas, totalCount: metaCount });
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         res.end();
            //     });
        } catch (err) {
            console.log(err);
        }
    }

    static async dashboardSetMetaThumbnailsAndCount(req: Request, res: Response) {
        res.end();
        if (isMainThread) {
            const workerPath = path.join(
                __dirname,
                `${dev ? '' : '../'}../workers/setMetaThumbnailsAndCount/worker.js`,
            );
            const worker = new Worker(workerPath, {
                workerData: {
                    type: req.query.type,
                },
            });

            worker.once('message', () => {
                worker.postMessage({ exit: true });
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
                    process.exit(0);
                }
            });
        }
    }
}

export default MetaController;


// const deletePromises = idsArray.map(commentId => {
//     const meta = metaSchema.findById(commentId).exec();
//     if (!!meta) {
//         // const postsWithThisMeta = postSchema.find({ [meta?.type]: { $in: [meta?._id] } }).exec();
//         await postSchema
//             .updateMany(
//                 { [meta?.type]: { $in: [meta?._id] } }, // Find all posts with the specified meta ID
//                 { $pull: { [meta?.type]: meta?._id } }, // Remove the specified meta ID from the array
//             )
//             .exec()
//             .then(result => {
//                 console.log(result); // { n: number of matched docs, nModified: number of modified docs, ... }
//             })
//             .catch(err => {
//                 console.error(err);
//             });
//
//
//     }
//
//
// });