"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var pageSchema_1 = tslib_1.__importDefault(require("../../../models/pageSchema"));
var adminGetPagesData = function (req, res) {
    pageSchema_1.default.find({}).exec().then(function (pages) {
        res.json({ pages: pages, error: false });
    }).catch(function (err) {
        console.log(err);
        res.end();
    });
};
exports.default = adminGetPagesData;
//# sourceMappingURL=adminGetPagesData.js.map