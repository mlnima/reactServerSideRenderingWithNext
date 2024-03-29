import {parentPort, workerData} from 'worker_threads';
import shell from 'shelljs';

const worker = async (workerData) => {
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

worker(workerData).then(result=>{
    parentPort.postMessage(result)
})