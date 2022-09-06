"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var pageSchema_1 = tslib_1.__importDefault(require("../../../models/pageSchema"));
var adminDeleteCustomPage = function (req, res) {
    var pageId = req.body.id;
    if (pageId) {
        pageSchema_1.default.findByIdAndDelete(pageId).exec().then(function (pageData) {
            res.json({ message: 'Page Deleted' });
        }).catch(function (err) {
            console.log(err);
            res.status(400).json({ message: 'Page Deleted' });
        });
    }
    else {
        res.end();
    }
};
exports.default = adminDeleteCustomPage;
//# sourceMappingURL=adminDeleteCustomPage.js.map