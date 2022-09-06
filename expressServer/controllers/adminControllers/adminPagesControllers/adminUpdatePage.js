"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var pageSchema_1 = tslib_1.__importDefault(require("../../../models/pageSchema"));
var adminUpdatePage = function (req, res) {
    var updateData = req.body.pageData;
    pageSchema_1.default.findByIdAndUpdate(updateData._id, updateData, { new: true }).exec().then(function (updated) {
        res.json({ updated: updated });
    });
};
exports.default = adminUpdatePage;
//# sourceMappingURL=adminUpdatePage.js.map