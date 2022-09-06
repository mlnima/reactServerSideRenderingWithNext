"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var formSchema_1 = tslib_1.__importDefault(require("../../../models/formSchema"));
var adminGetFormData = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _id;
    return tslib_1.__generator(this, function (_a) {
        _id = req.body._id;
        formSchema_1.default.findById(_id).exec().then(function (formData) {
            res.json({ form: formData, error: false });
        });
        return [2 /*return*/];
    });
}); };
exports.default = adminGetFormData;
//# sourceMappingURL=adminGetFormData.js.map