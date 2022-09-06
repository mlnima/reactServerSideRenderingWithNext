"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var worker_threads_1 = require("worker_threads");
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
var commandExecutor = function (workerData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var command, splitCommands, commandPromises, executeCommand, err_1;
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                command = workerData.command;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                if (!(command && command.includes(' ; '))) return [3 /*break*/, 2];
                splitCommands = command.split(';');
                commandPromises = splitCommands.map(function (singleCommand) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (shelljs_1.default === null || shelljs_1.default === void 0 ? void 0 : shelljs_1.default.exec(singleCommand))];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
                Promise.all(tslib_1.__spreadArray([], tslib_1.__read(commandPromises), false)).then(function (results) {
                    var resultsCombine = results.reduce(function (a, b) { return a + '/n' + b; });
                    return { response: resultsCombine };
                });
                return [3 /*break*/, 4];
            case 2:
                executeCommand = shelljs_1.default === null || shelljs_1.default === void 0 ? void 0 : shelljs_1.default.exec(command);
                _a = {};
                return [4 /*yield*/, executeCommand.stdout];
            case 3: return [2 /*return*/, (_a.response = _b.sent(), _a)];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.log(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
commandExecutor(worker_threads_1.workerData).then(function (result) {
    worker_threads_1.parentPort.postMessage(result);
});
//# sourceMappingURL=commandExecutor.js.map