"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var formSchema_1 = tslib_1.__importDefault(require("../../../models/formSchema"));
var adminGetFormsData = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var size, searchQuery, pageNo, sortQuery, formsData, formsCount;
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                size = req.body.size ? parseInt(req.body.size) > 500 ? 500 : parseInt(req.body.size) : 30;
                searchQuery = { $or: [{ widgetID: new RegExp(req.body.keyword, 'i') }, { data: new RegExp(req.body.keyword, 'i') }] };
                pageNo = req.body.pageNo || 1;
                sortQuery = req.body.sort === 'latest' ? '-_id' : (_a = {}, _a[req.body.sort] = -1, _a);
                return [4 /*yield*/, formSchema_1.default.find().limit(size).sort(sortQuery).exec()];
            case 1:
                formsData = _b.sent();
                return [4 /*yield*/, formSchema_1.default.countDocuments({}).exec()];
            case 2:
                formsCount = _b.sent();
                Promise.all([formsData, formsCount]).then(function (foundFormsData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    var forms;
                    return tslib_1.__generator(this, function (_a) {
                        forms = foundFormsData[0];
                        res.json({ forms: forms, error: false, totalCount: foundFormsData[1] });
                        return [2 /*return*/];
                    });
                }); }).catch(function (err) {
                    res.end();
                });
                return [2 /*return*/];
        }
    });
}); };
exports.default = adminGetFormsData;
//# sourceMappingURL=adminGetFormsData.js.map