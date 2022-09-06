"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var adminExportPosts = function (req, res) {
    var _a;
    var postType = ((_a = req.body.data) === null || _a === void 0 ? void 0 : _a.postType) ? { postType: req.body.data.postType } : {};
    var metaId = req.body.data.metaId ? { $or: [{ categories: req.body.data.metaId }, { tags: req.body.data.metaId }, { actors: req.body.data.metaId }] } : {};
    var author = req.body.data.author ? { author: req.body.data.author } : {};
    var limit = req.body.data.limit ? { limit: parseInt(req.body.data.limit) } : {};
    var options = tslib_1.__assign({}, limit);
    postSchema_1.default.find({ $and: [postType, metaId, author] }, {}, options).populate([
        { path: 'categories' },
        { path: 'tags' },
        { path: 'actors' },
    ]).exec()
        .then(function (finalData) {
        res.json({ exportedData: finalData });
        // const json = JSON.stringify(finalData);
        // const filename = 'posts.json';
        // const mimetype = 'application/json';
        // res.setHeader('Content-Type', mimetype);
        // res.setHeader('Content-disposition','attachment; filename='+filename);
        // res.json( json );
    }).catch(function (err) {
        res.status(500);
    });
};
exports.default = adminExportPosts;
//# sourceMappingURL=adminExportPosts.js.map