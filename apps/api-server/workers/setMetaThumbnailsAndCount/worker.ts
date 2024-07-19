import 'module-alias/register';
import { register } from 'tsconfig-paths';
import dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' });
const baseUrl = process.cwd();
const cleanup = register({
    baseUrl,
    paths: {
        '@_variables/*': ['./_variables/*'],
        '@schemas/*': ['./schemas/*'],
        '@util/*': ['./util/*'],
        '@env/*': ['../../.env'],
        '@store/*': ['./store/*'],
    },
});

import { parentPort, workerData } from 'worker_threads';
import postSchema from '@schemas/postSchema';
import metaSchema from '@schemas/metaSchema';
import mongoose from 'mongoose';
import GlobalStore from '@store/GlobalStore';

dotenv.config();
GlobalStore.connectToDatabase('Worker').finally();

const randomNumberGenerator = (min, max) => {
    return Math.ceil(Math.random() * (max - min) + min);
};


const fixSingleMeta = async(meta)=>{
    try {
        const metaCount = await postSchema
            .countDocuments({ $and: [{ [meta?.type]: { $in: meta?._id } }, { status: 'published' }] })
            .exec();

        if (metaCount > 0 && meta?._id) {
            //***************************
            const totalSumData = await postSchema.aggregate([
                {
                    $match: {
                        $and: [
                            { status: 'published' },
                            { [meta?.type]: { $exists: true } },
                            { [meta?.type]: { $in: [new mongoose.Types.ObjectId(meta._id)] } },
                        ],
                    },
                },
                { $project: { likes: 1, views: 1, [meta?.type]: 1 } },
                {
                    $group: {
                        _id: null,
                        likes: { $sum: { $add: ['$likes'] } },
                        views: { $sum: { $add: ['$views'] } },
                    },
                },
            ]);
            //***************************

            let updateData = {
                count: metaCount,
                name: meta?.name.toLowerCase(),
                status: 'published',
                likes: totalSumData?.[0]?.likes || 0,
                views: totalSumData?.[0]?.views || 0,
                imageUrl:meta?.imageUrl || ''
            };

            if (!meta?.imageUrlLock && workerData.type !== 'tags') {
                const skipDocuments = metaCount <= 1 ? 0 : randomNumberGenerator(1, metaCount) - 1;
                const randomPost = await postSchema
                    .findOne({
                        $and: [
                            { [meta?.type]: meta?._id },
                            { status: 'published' },
                            { mainThumbnail: { $exists: true } },
                        ],
                    })
                    .sort({ updatedAt: -1 })
                    .skip(skipDocuments)
                    .exec();
                if (randomPost?.mainThumbnail) {
                    //@ts-ignore
                    updateData.imageUrl =
                        randomPost?.mainThumbnail;
                }
            }

            await metaSchema
                .findByIdAndUpdate(meta?._id, { $set: { ...updateData } }, { timestamps: false })
                .exec()
                .finally(() => {
                    // console.log(`${meta?.type} ${meta?.name} set to ${JSON.stringify(updateData, null, '\t')}`)
                    //@ts-ignore
                    console.log(
                        `${meta?.type} ${meta?.name} has ${metaCount} and image set to ${updateData?.imageUrl || '/asset/images/default/no-image-available.png'}`,
                    );
                });
        } else {
            await metaSchema
                .findByIdAndUpdate(meta?._id, { $set: { status: 'draft' } }, { timestamps: false })
                .exec();
            console.log(meta?.name, `drafted`);
        }
    }catch (error){

    }
}


const worker = async workerData => {
    try {
        // const excludesPostFromSources = !!process.env.EXCLUDE_POSTS_SOURCE ? process.env.EXCLUDE_POSTS_SOURCE.split(' ') : [];

        // const excludeContent = excludesPostFromSources.map(excludeWord => {
        //     const expression = `.*${excludeWord}.*`
        //     return {'videoEmbedCode': {$not: new RegExp(expression, "g")}}
        // })

        // const excludeQuery = {$or: excludeContent}

        await metaSchema.syncIndexes();
        const type = workerData.type ? { type: workerData.type } : {};
        await metaSchema
            .find(type)
            .exec()
            .then(async metas => {
                for await (let meta of metas) {
                    //const metaCount = await PostSchema.countDocuments({$and: [{[meta?.type]: meta?._id}, {status: 'published'},excludeQuery]}).exec()
                   await fixSingleMeta(meta)
                }
            });
    } catch (err) {
        console.log('ERROR', err.stack);
    }
    return null;
};

worker(workerData).then(res => {
    parentPort.postMessage(res);
    process.exit(0);
});
