"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var widgetSchema_1 = tslib_1.__importDefault(require("../../../models/widgetSchema"));
var adminAddNewWidget = function (req, res) {
    var data = req.body.data;
    var dataToSave = new widgetSchema_1.default({ data: data });
    dataToSave === null || dataToSave === void 0 ? void 0 : dataToSave.save(function (err, newWidgetData) {
        if (err) {
            res.end({ newWidgetData: newWidgetData });
        }
        res.json({ newWidgetData: newWidgetData });
    });
};
exports.default = adminAddNewWidget;
//# sourceMappingURL=adminAddNewWidget.js.map