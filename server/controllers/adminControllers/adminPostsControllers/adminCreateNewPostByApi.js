const {isMainThread, Worker, parentPort} = require("worker_threads");

module.exports = async (req, res) => {

    if (isMainThread){
        const worker = new Worker(
            './server/workers/createNewPostByApi.js',
            {
                workerData:{
                    newPost: req.body.postData,
                    dontSaveDuplicate: req.body.dontSaveDuplicate,
                    downloadImageContent: req.body.downloadImageContent,
                }
            }
        )

        worker.once('message',(resultData) =>{
            worker.postMessage({ exit: true })
            res.json({message: resultData?.message})
        })
        worker.on('error', error => {
            worker.postMessage({ exit: true })
            res.json({message: 'error',error})
        });

        // worker.on('exit', exitCode => {
        //    console.log('task finished',exitCode)
        // })
    }else{
        parentPort.on("message", (commandFromMainThread) => {
            if (commandFromMainThread.exit) {
                process.exit(0);
            }
        });
    }
}

