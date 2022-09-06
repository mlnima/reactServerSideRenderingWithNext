"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var adminDeletePost = function (req, res) {
    var _id = req.body._id;
    postSchema_1.default.findByIdAndDelete(_id).then(function () {
        res.json({ message: "".concat(_id, " Deleted Permanently"), error: false });
    }).catch(function () {
        res.json({ message: "Can Not Delete ".concat(_id, " Something Went Wrong"), error: true });
    });
};
exports.default = adminDeletePost;
//# sourceMappingURL=adminDeletePost.js.map