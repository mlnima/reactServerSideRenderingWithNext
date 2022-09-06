"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var adminGetUsersList = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var totalCount;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userSchema_1.default.countDocuments({}).exec()];
            case 1:
                totalCount = _a.sent();
                userSchema_1.default.find({}).exec().then(function (users) {
                    res.json({ users: users, totalCount: totalCount });
                });
                return [2 /*return*/];
        }
    });
}); };
exports.default = adminGetUsersList;
//# sourceMappingURL=adminGetUsersList.js.map