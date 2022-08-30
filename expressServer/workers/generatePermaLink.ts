import dotenv from 'dotenv';
import connectToDatabase from '../_variables/connectToDatabase';
import {parentPort} from 'worker_threads';
import postSchema from '../models/postSchema';

dotenv.config();
connectToDatabase('setMetaThumbnailsAndCount :').finally();

const generatePermaLink = async () => {

    try {
        await postSchema.syncIndexes()
        const findingPostsQuery = {permaLink: {$exists: false}}
        await postSchema.find(findingPostsQuery).exec().then(async posts => {
            for await (let post of posts) {
                const permaLink = post?.title ? post.title.replaceAll(' ', '-') : null
                await postSchema.findByIdAndUpdate(post._id, {$set: {permaLink}}, {
                    new: true,
                    timestamps: false
                }).exec().then(updatedPost => {
                    parentPort.postMessage({
                        type: 'log',
                        message: `${updatedPost._id},${updatedPost.title},${updatedPost.permaLink}`
                    })
                })
            }
            parentPort.postMessage({type: 'action', message: 'job is done', exit: true})
        })

    } catch (err) {
        console.log('err')
    }
    return null
}


generatePermaLink().then(() => {
    parentPort.on('message', (data) => {
        console.log('message from main process:', data)
        if (data.exit) {
            process.exit(0);
        }
    })
})