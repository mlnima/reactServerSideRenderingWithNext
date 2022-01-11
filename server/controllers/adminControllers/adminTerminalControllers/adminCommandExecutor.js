//adminCommandExecutor
const {Worker, isMainThread,parentPort} = require('worker_threads');

module.exports = async (req, res) => {
    const command = req.body.command;
    try {
        const worker = new Worker(
            './server/workers/commandExecutor.js',
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