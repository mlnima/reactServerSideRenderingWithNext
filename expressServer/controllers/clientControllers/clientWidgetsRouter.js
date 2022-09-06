"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var apiCache_1 = tslib_1.__importDefault(require("../../middlewares/apiCache"));
var clientGetMultipleWidgetWithData_1 = tslib_1.__importDefault(require("./clientWidgetsControllers/clientGetMultipleWidgetWithData"));
var clientGetWidget_1 = tslib_1.__importDefault(require("./clientWidgetsControllers/clientGetWidget"));
var router = (0, express_1.Router)();
router.get('/getMultipleWidgetWithData', apiCache_1.default, clientGetMultipleWidgetWithData_1.default);
router.post('/getMultipleWidgetWithData', function (req, res) {
    res.status(404).json({ message: 'Route Has Been changed' });
});
router.post('/getWidget', apiCache_1.default, clientGetWidget_1.default);
// router.post('/clientSelfWidgetUpdate',clientSelfWidgetUpdate)
exports.default = router;
//# sourceMappingURL=clientWidgetsRouter.js.map