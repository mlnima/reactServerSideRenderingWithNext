"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _a = require("worker_threads"), isMainThread = _a.isMainThread, Worker = _a.Worker, parentPort = _a.parentPort;
var adminCheckAndRemoveDeletedVideos = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var worker_1;
    return tslib_1.__generator(this, function (_a) {
        res.end();
        if (isMainThread) {
            worker_1 = new Worker('./expressServer/workers/checkAndRemoveDeletedVideos.js', { workerData: { type: req.query.type } });
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
            parentPort.on("message", function (commandFromMainThread) {
                if (commandFromMainThread.exit) {
                    process.exit(0);
                }
            });
        }
        return [2 /*return*/];
    });
}); };
exports.default = adminCheckAndRemoveDeletedVideos;
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
//                 // res.end()
//             }
//         })
//     }catch (err){
//     }
// }
//# sourceMappingURL=adminCheckAndRemoveDeletedVideos.js.map