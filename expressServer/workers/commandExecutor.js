const {parentPort, workerData} = require("worker_threads");
const shell = require("shelljs");

const commandExecutor = async (workerData) => {
    const command = workerData.command
    try {
        if (command && command.includes(' ; ')) {
            const splitCommands = command.split(';')
            const commandPromises = splitCommands.map(async singleCommand => {
                return await shell?.exec(singleCommand)
            })
            Promise.all([...commandPromises]).then(results => {
                const resultsCombine = results.reduce((a, b) => a + '/n' + b)
                return {response: resultsCombine}
            })
        } else {
            const executeCommand = shell?.exec(command)
            return {response: await executeCommand.stdout}
        }
    }catch (err){
        console.log(err)
    }
}

commandExecutor(workerData).then(result=>{
    parentPort.postMessage(result)
})