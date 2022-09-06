"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var pageSchema_1 = tslib_1.__importDefault(require("../../../models/pageSchema"));
var clientGetPagesData = function (req, res) {
    pageSchema_1.default.find({}).exec().then(function (pagesData) {
        res.json({ pagesData: pagesData, error: false });
    }).catch(function (err) {
        console.log(err);
        res.status(404).json({ message: 'not found' });
    });
};
exports.default = clientGetPagesData;
//# sourceMappingURL=clientGetPagesData.js.map