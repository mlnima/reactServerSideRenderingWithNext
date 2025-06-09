import { parentPort, workerData } from 'worker_threads';
import shell from 'shelljs';

interface WorkerData {
    command: string;
}

const worker = async ({ command }: WorkerData) => {
    try {
        if (command.includes(';')) {
            // Handle multiple commands separated by ';'
            const splitCommands = command.split(';');
            const commandPromises = splitCommands.map(singleCommand => {
                return new Promise<string>((resolve, reject) => {
                    shell.exec(singleCommand, (code, stdout, stderr) => {
                        if (code !== 0) {
                            reject(stderr);
                        } else {
                            resolve(stdout);
                        }
                    });
                });
            });

            const results = await Promise.all(commandPromises);
            const resultsCombine = results.join('\n');
            return { response: resultsCombine };
        } else {
            // Single command execution
            const { stdout, stderr, code } = shell.exec(command);
            if (code !== 0) {
               // throw new Error(stderr);
            }
            return { response: stdout };
        }
    } catch (err) {
        console.error('Error executing command:', err);
        return { error: err.message };
    }
};

if (parentPort) {
    worker(workerData).then(result => {
        parentPort.postMessage(result);
    }).catch(error=>console.log(`worker Error=> `,error))
}


// import {parentPort, workerData} from 'worker_threads';
// import shell from 'shelljs';
//
// const worker = async (workerData:{command:string}) => {
//     const command = workerData.command
//     try {
//         if (command && command.includes(' ; ')) {
//             const splitCommands = command.split(';')
//             const commandPromises = splitCommands.map(async singleCommand => {
//                 return await shell?.exec(singleCommand)
//             })
//             Promise.all([...commandPromises]).then(results => {
//                 const resultsCombine = results.reduce((a, b) => a + '/n' + b)
//                 return {response: resultsCombine}
//             })
//         } else {
//             const executeCommand = shell?.exec(command)
//             return {response: await executeCommand.stdout}
//         }
//     }catch (err){
//         console.log(err)
//     }
// }
//
// worker(workerData).then(result=>{
//     parentPort.postMessage(result)
// })