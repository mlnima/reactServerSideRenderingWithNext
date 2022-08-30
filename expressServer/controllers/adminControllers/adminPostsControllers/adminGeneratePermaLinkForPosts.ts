import {Worker, isMainThread, parentPort} from 'worker_threads';

const adminGeneratePermaLinkForPosts = async (req, res) => {
    res.end()
    if (isMainThread) {
        const worker = new Worker(
            './expressServer/workers/generatePermaLink.ts',
            {workerData: {}}
        )

        worker.on('message', (data) => {
            data.type === 'log' && console.log(data.message)

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

export default adminGeneratePermaLinkForPosts;