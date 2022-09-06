"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var widgetSchema_1 = tslib_1.__importDefault(require("../../../models/widgetSchema"));
var adminDeleteWidget = function (req, res) {
    if (req.body._id) {
        var _id = req.body._id;
        widgetSchema_1.default.findByIdAndDelete({ _id: _id }).exec().then(function () {
            res.json({ deleted: true });
        }).catch(function (err) {
            console.log(err);
            res.end();
        });
    }
};
exports.default = adminDeleteWidget;
//# sourceMappingURL=adminDeleteWidget.js.map