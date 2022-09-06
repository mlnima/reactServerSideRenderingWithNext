"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var adminUpdatePostByApi = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var updatedPostData_1;
    return tslib_1.__generator(this, function (_a) {
        try {
            updatedPostData_1 = req.body.updatedPostData;
            postSchema_1.default.findByIdAndUpdate(updatedPostData_1._id, updatedPostData_1).exec().then(function () {
                res.json({ message: updatedPostData_1._id + ' updated' });
            });
        }
        catch (err) {
            console.log(err);
        }
        return [2 /*return*/];
    });
}); };
exports.default = adminUpdatePostByApi;
//# sourceMappingURL=adminUpdatePostByApi.js.map