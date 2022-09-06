"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
//checkRemovedContent
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var metaSchema_1 = tslib_1.__importDefault(require("../../../models/metaSchema"));
var widgetSchema_1 = tslib_1.__importDefault(require("../../../models/widgetSchema"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var adminUpdateWidget_1 = require("../../adminControllers/adminWidgetsControllers/adminUpdateWidget");
var clientCheckRemovedContent = function (req, res) {
    var checkUrl = req.body.checkUrl;
    if (checkUrl) {
        (0, axios_1.default)(checkUrl).then(function (result) {
        }).catch(function (err) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status) >= 400 && ((_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.status) < 499 || err.code === 'ENOTFOUND')) return [3 /*break*/, 3];
                        return [4 /*yield*/, postSchema_1.default.findOneAndUpdate({ mainThumbnail: checkUrl }, { $set: { status: 'pending' } }, { new: true }).exec().then(function (post) {
                                widgetSchema_1.default.findOne({ 'data.posts': post._id }).exec().then(function (widget) {
                                    if (widget) {
                                        (0, adminUpdateWidget_1.updatePostWidgetData)(widget).then(function (updatedWidgets) {
                                            widgetSchema_1.default.findByIdAndUpdate(widget._id, { 'data..uniqueData.posts': tslib_1.__spreadArray([], tslib_1.__read(updatedWidgets.posts), false) }, { new: true }).exec();
                                        });
                                    }
                                });
                            })
                            //update meta if has this post image
                        ];
                    case 1:
                        _c.sent();
                        //update meta if has this post image
                        return [4 /*yield*/, metaSchema_1.default.findOne({ imageUrl: checkUrl }).exec().then(function (meta) {
                                var _a;
                                if (meta) {
                                    postSchema_1.default.findOne({ $and: [(_a = {}, _a[meta.type] = meta._id, _a), { status: 'published' }] }).exec().then(function (post) {
                                        if (post) {
                                            metaSchema_1.default.findByIdAndUpdate(meta._id, { $set: { imageUrl: post.mainThumbnail } }, { new: true }).exec().then(function (updatedMeta) {
                                                res.json({ newImageUrl: updatedMeta.imageUrl });
                                            }).catch(function (err) {
                                                console.log(err);
                                            });
                                        }
                                        else {
                                            res.end();
                                        }
                                    }).catch(function (err) {
                                        res.end();
                                    });
                                }
                                else {
                                    res.end();
                                }
                            })];
                    case 2:
                        //update meta if has this post image
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        res.end();
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    }
    else {
        res.end();
    }
};
exports.default = clientCheckRemovedContent;
//# sourceMappingURL=clientCheckRemovedContent.js.map