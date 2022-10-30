//adminCommandExecutor
import path from "path";

const {Worker, isMainThread,parentPort} = require('worker_threads');

const adminCommandExecutor = async (req, res) => {
    const command = req.body.command;
    try {
        const workerPath = path.join(__dirname,'../../../workers/commandExecutor/worker.js') ;

        const worker = new Worker(
            workerPath,
            {workerData:{command}}
        )

        worker.once('message',result =>{
            res.json({response: result.response})
            worker.postMessage({ exit: true })
            res.end()
        })

        worker.on('error', error => {
            console.log('error:',error);
        });

        worker.on('exit', exitCode => {
            console.log('exitCode : ',exitCode);
        })

    }catch (err){
        console.log(err)
    }
}

export default adminCommandExecutor;


// OLD CODE FOR MAIN THREAD
// if (command && command.includes(' ; ')) {
//     const splitCommands = command.split(';')
//     const commandPromises = splitCommands.map(async singleCommand => {
//         return await shell.exec(singleCommand)
//     })
//     Promise.all([...commandPromises]).then(results => {
//         const resultsCombine = results.reduce((a, b) => a + '/n' + b)
//         res.json({response: resultsCombine})
//     })
// } else {
//     const executeCommand = shell.exec(command)
//     res.json({response: await executeCommand.stdout})
// }