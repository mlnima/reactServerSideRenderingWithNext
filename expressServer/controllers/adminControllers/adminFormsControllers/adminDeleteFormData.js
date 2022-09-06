"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var formSchema_1 = tslib_1.__importDefault(require("../../../models/formSchema"));
var adminDeleteFormData = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _id;
    return tslib_1.__generator(this, function (_a) {
        _id = req.body._id;
        formSchema_1.default.findByIdAndDelete(_id).exec().then(function () {
            res.json({ message: 'form deleted' });
        }).catch(function (err) {
            res.status(500).json({ message: 'Something went wrong please try again later' });
        });
        return [2 /*return*/];
    });
}); };
exports.default = adminDeleteFormData;
//# sourceMappingURL=adminDeleteFormData.js.map