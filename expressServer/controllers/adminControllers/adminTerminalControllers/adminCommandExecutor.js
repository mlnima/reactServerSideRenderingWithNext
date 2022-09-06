"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
//adminCommandExecutor
var _a = require('worker_threads'), Worker = _a.Worker, isMainThread = _a.isMainThread, parentPort = _a.parentPort;
var adminCommandExecutor = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var command, worker_1;
    return tslib_1.__generator(this, function (_a) {
        command = req.body.command;
        try {
            worker_1 = new Worker('./expressServer/workers/commandExecutor.js', { workerData: { command: command } });
            worker_1.once('message', function (result) {
                res.json({ response: result.response });
                worker_1.postMessage({ exit: true });
                res.end();
            });
            worker_1.on('error', function (error) {
                console.log('error:', error);
            });
            worker_1.on('exit', function (exitCode) {
                console.log('exitCode : ', exitCode);
            });
        }
        catch (err) {
            console.log(err);
        }
        return [2 /*return*/];
    });
}); };
exports.default = adminCommandExecutor;
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
//# sourceMappingURL=adminCommandExecutor.js.map