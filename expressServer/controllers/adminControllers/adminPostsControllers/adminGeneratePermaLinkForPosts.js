"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var worker_threads_1 = require("worker_threads");
var adminGeneratePermaLinkForPosts = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var worker_1;
    return tslib_1.__generator(this, function (_a) {
        res.end();
        if (worker_threads_1.isMainThread) {
            worker_1 = new worker_threads_1.Worker('./expressServer/workers/generatePermaLink.ts', { workerData: {} });
            worker_1.on('message', function (data) {
                data.type === 'log' && console.log(data.message);
                if (data.exit) {
                    data.exit && worker_1.postMessage({ exit: true });
                }
            });
            worker_1.on('error', function (error) {
                console.log('error:', error);
            });
            worker_1.on('exit', function (exitCode) {
                console.log('exitCode : ', exitCode);
            });
        }
        else {
            worker_threads_1.parentPort.on("message", function (commandFromMainThread) {
                if (commandFromMainThread.exit) {
                    console.log('terminating thread');
                    process.exit(0);
                }
            });
        }
        return [2 /*return*/];
    });
}); };
exports.default = adminGeneratePermaLinkForPosts;
//# sourceMappingURL=adminGeneratePermaLinkForPosts.js.map