"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var pageSchema_1 = tslib_1.__importDefault(require("../../../models/pageSchema"));
var clientGetPageData = function (req, res) {
    var pageId = req.body.id;
    var pageName = req.query.pageName;
    if (pageId) {
        pageSchema_1.default.findById(pageId).exec().then(function (pageData) {
            res.json({ pageData: pageData, error: false });
        }).catch(function (err) {
            console.log(err);
            res.status(404).json({ message: 'not found' });
        });
    }
    else if (pageName) {
        pageSchema_1.default.findOne({ pageName: pageName }).exec().then(function (pageData) {
            res.json({ pageData: pageData, error: false });
        }).catch(function (err) {
            console.log(err);
            res.status(404).json({ message: 'not found' });
        });
    }
};
exports.default = clientGetPageData;
//# sourceMappingURL=clientGetPageData.js.map