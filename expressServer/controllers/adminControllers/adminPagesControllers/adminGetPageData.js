"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var pageSchema_1 = tslib_1.__importDefault(require("../../../models/pageSchema"));
var adminGetPageData = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pageSchema_1.default.findById(req.body._id).exec().then(function (pageData) {
                        res.json({ pageData: pageData, error: false });
                    }).catch(function (err) {
                        res.status(404).json({ message: 'Not Found' });
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).json({ message: 'Something Went Wrong' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = adminGetPageData;
//# sourceMappingURL=adminGetPageData.js.map