import {Worker, isMainThread,parentPort} from 'worker_threads';

const adminSetMetaThumbnailsAndCount = async (req,res) =>{
    res.end()
    if (isMainThread){
        const worker = new Worker(
            './expressServer/workers/setMetaThumbnailsAndCount.js',
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
                console.log('terminating thread')
                process.exit(0);
            }
        });
    }
}



export default adminSetMetaThumbnailsAndCount

// OLD CODE FOR MAIN THREAD
// module.exports = async (req,res) =>{
//     try {
//
//         res.end()
//         await metaSchema.syncIndexes()
//         const type = req.query.type ? {type:req.query.type} : {}
//         await metaSchema.find(type).exec().then(async (metas) => {
//             for await (let meta of metas) {
//                 const metaCount = await postSchema.countDocuments({$and: [{[meta?.type]: meta?._id}, {status: 'published'}]}).exec()
//                 if (metaCount > 0){
//                     const random = Math.floor(Math.random() * (metaCount || 0))
//                     const randomPostWithCurrentMeta = await postSchema.findOne({$and: [{[meta?.type]: meta?._id}, {status: 'published'}]}).skip(random).exec()
//                     const randomImageData = meta?.imageUrlLock ?  {} : {imageUrl : randomPostWithCurrentMeta?.mainThumbnail || ''}
//                     const updateData = {
//                         count: metaCount,
//                         name:meta?.name.toLowerCase(),
//                         status: meta?.status ? meta.status : 'published',
//                         ...randomImageData
//                     }
//                    await metaSchema.findByIdAndUpdate(meta?._id, {$set:{...updateData}},{new: true}).exec().then((updated)=>{
//                     }).catch(err=>{
//
//                     })
//                 }else {
//                     await  metaSchema.findByIdAndUpdate(meta?._id,{$set:{status:'draft'}}).exec()
//                 }
//             }
//         })
//
//     } catch (err) {
//         console.log('ERROR',err.stack)
//     }
// }