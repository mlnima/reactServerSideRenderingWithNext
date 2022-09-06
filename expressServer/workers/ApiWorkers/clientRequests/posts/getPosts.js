"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
var connectToDatabase_1 = tslib_1.__importDefault(require("../../../../_variables/connectToDatabase"));
(0, connectToDatabase_1.default)('Worker getPosts').finally();
// const {parentPort, workerData} = require("worker_threads");
var worker_threads_1 = require("worker_threads");
var getPostsWorker = function (data) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        console.log(data);
        return [2 /*return*/, 'worker is fine'
            // parentPort.postMessage(query)
        ];
    });
}); };
getPostsWorker(worker_threads_1.workerData).then(function (result) {
    worker_threads_1.parentPort.postMessage(result);
});
// export default getPostsWorker
//# sourceMappingURL=getPosts.js.map