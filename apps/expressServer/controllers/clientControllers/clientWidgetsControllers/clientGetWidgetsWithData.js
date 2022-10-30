"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var widgetSchema_1 = tslib_1.__importDefault(require("../../../models/widgetSchema"));
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var clientGetWidgetsWithData = function (req, res) {
    var position = req.body.position === 'all' ? {} : { position: req.body.position };
    widgetSchema_1.default.find(position).exec().then(function (widgets) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mapWidget, data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mapWidget = widgets.map(function (widget) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var finalData, sortMethod;
                        var _a;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    finalData = {
                                        _id: widget._id,
                                        title: widget === null || widget === void 0 ? void 0 : widget.title,
                                        categories: widget.categories,
                                        tags: widget.tags,
                                        pagination: widget.pagination,
                                        redirectLink: widget.redirectLink,
                                        redirectToTitle: widget.redirectToTitle,
                                        count: widget.count,
                                        type: widget.type,
                                        position: widget.position,
                                        posts: [],
                                        sortBy: widget.sortBy,
                                        text: widget.text,
                                        textAlign: widget.textAlign,
                                        customHtml: widget.customHtml,
                                        backgroundImage: widget.backgroundImage
                                    };
                                    sortMethod = finalData.sortBy ? (_a = {}, _a[finalData.sortBy] = -1, _a) : { lastModify: -1 };
                                    if (!(finalData.type === 'posts')) return [3 /*break*/, 2];
                                    return [4 /*yield*/, postSchema_1.default.find({ status: 'published' }).limit(widget.count).sort(sortMethod).exec().then(function (posts) {
                                            finalData.posts = posts;
                                        })];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/, finalData];
                                case 2: return [2 /*return*/, widget];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(mapWidget)];
                case 1:
                    data = _a.sent();
                    res.json({ widgets: data || [] });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.default = clientGetWidgetsWithData;
//# sourceMappingURL=clientGetWidgetsWithData.js.map