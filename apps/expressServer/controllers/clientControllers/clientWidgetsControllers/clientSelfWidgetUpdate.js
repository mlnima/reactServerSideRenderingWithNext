"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var widgetSchema_1 = tslib_1.__importDefault(require("../../../../../packages/models/src/widgetSchema"));
// const metaSchema = require('../../../models/metaSchema');
// const postSchema = require('../../../models/metaSchema');
// const {updatePostWidgetData} = require('../../adminControllers/adminWidgetsControllers/adminUpdateWidget');
var adminUpdateWidget_1 = require("../../adminControllers/adminWidgetsControllers/adminUpdateWidget");
var clientSelfWidgetUpdate = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, widgetSchema_1.default.findById(req.body._id).exec().then(function (widget) {
                    (0, adminUpdateWidget_1.updatePostWidgetData)(widget).then(function (updatedWidgets) {
                        widgetSchema_1.default.findByIdAndUpdate(req.body._id, { 'data.uniqueData.posts': tslib_1.__spreadArray([], tslib_1.__read(updatedWidgets.posts), false) }, { new: true }).exec().then(function (afterUpdate) {
                            res.json({ updatedWidgets: afterUpdate });
                        }).catch(function (err) {
                            console.log(err);
                            res.status(503).json({ message: 'something went wrong please try again later' });
                        });
                    });
                })];
            case 1:
                _a.sent();
                res.end();
                return [2 /*return*/];
        }
    });
}); };
exports.default = clientSelfWidgetUpdate;
//# sourceMappingURL=clientSelfWidgetUpdate.js.map