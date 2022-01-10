const {isMainThread, Worker, parentPort} = require("worker_threads");

module.exports = async (req,res) =>{
    res.end()
    if (isMainThread){
        const worker = new Worker(
            './server/workers/checkAndRemoveDeletedVideos.js',
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













// module.exports = async (req,res)=>{
//     try {
//         res.end()
//
//         await postSchema.find({$and:[{type:'video'},{status:'published'}]}).exec().then(async posts=>{
//             try {
//                 for await (const post of posts){
//                     if (post?.videoEmbedCode){
//                            await axios.get(post.videoEmbedCode).then(()=>{
//                                console.log(`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/post/video/${post._id} is ok`)
//                                // res.write(`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/post/video/${post._id} is ok`);
//                            }).catch(async err=>{
//                                 if (err?.response?.status === 410 || err?.response?.status === 404){
//                                 await postSchema.findByIdAndUpdate(post._id,{$set:{status:'trash'}},{new:true}).exec().then(trashedpost=>{
//                                     console.log(`http://localhost:3000/post/video/${post._id} trashed`)
//                                     // res.write(`http://localhost:3000/post/video/${post._id} trashed`);
//                                     })
//                                 }else {
//                                     console.log(err.stack)
//                                 }
//                             })
//                     }
//                 }
//                 // res.end()
//             }catch (err){
//                 console.log(err)
//                 // res.end()
//             }
//         })
//     }catch (err){
//         console.log(err)
//     }
// }