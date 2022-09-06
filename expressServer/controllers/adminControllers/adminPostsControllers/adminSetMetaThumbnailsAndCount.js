"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var worker_threads_1 = require("worker_threads");
var adminSetMetaThumbnailsAndCount = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var worker_1;
    return tslib_1.__generator(this, function (_a) {
        res.end();
        if (worker_threads_1.isMainThread) {
            worker_1 = new worker_threads_1.Worker('./expressServer/workers/setMetaThumbnailsAndCount.js', { workerData: { type: req.query.type } });
            worker_1.once('message', function () {
                worker_1.postMessage({ exit: true });
            });
            worker_1.on('error', function (error) {
                console.log('error:', error);
            });
            worker_1.on('exit', function (exitCode) {
                console.log('exitCode : ', exitCode);
            });
        }
        else {
            worker_threads_1.parentPort.on("message", function (commandFromMainThread) {
                if (commandFromMainThread.exit) {
                    console.log('terminating thread');
                    process.exit(0);
                }
            });
        }
        return [2 /*return*/];
    });
}); };
exports.default = adminSetMetaThumbnailsAndCount;
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
//# sourceMappingURL=adminSetMetaThumbnailsAndCount.js.map