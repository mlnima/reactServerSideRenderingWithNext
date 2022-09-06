"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var widgetSchema_1 = tslib_1.__importDefault(require("../../../models/widgetSchema"));
var databaseSelectFieldsForPostCards_1 = tslib_1.__importDefault(require("../../../../_dataStructures/databaseSelectFieldsForPostCards"));
var adminGetWidgets = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var widgets, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, widgetSchema_1.default.find({}).populate([
                        {
                            model: 'meta',
                            path: 'data.uniqueData.metaData'
                        },
                        {
                            model: 'post',
                            path: 'data.uniqueData.posts',
                            populate: [
                                {
                                    path: 'actors',
                                    select: { 'name': 1, 'type': 1 },
                                    options: {}
                                },
                                {
                                    path: 'categories',
                                    select: { 'name': 1, 'type': 1, 'imageUrl': 1 },
                                    options: {}
                                },
                                {
                                    path: 'tags',
                                    select: { 'name': 1, 'type': 1 },
                                    options: {}
                                }
                            ],
                            select: databaseSelectFieldsForPostCards_1.default
                        },
                    ]).sort({ updatedAt: -1 }).exec()];
            case 1:
                widgets = _a.sent();
                Promise.all(widgets).then(function (widgetsWithData) {
                    res.json({ widgets: widgetsWithData });
                }).catch(function (err) {
                    console.log(err);
                    res.end();
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                res.end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = adminGetWidgets;
//# sourceMappingURL=adminGetWidgets.js.map