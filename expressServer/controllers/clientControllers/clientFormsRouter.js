"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var clientSaveFormData_1 = tslib_1.__importDefault(require("./clientFormsControllers/clientSaveFormData"));
var router = (0, express_1.Router)();
router.post('/saveFormData', clientSaveFormData_1.default);
exports.default = router;
//# sourceMappingURL=clientFormsRouter.js.map