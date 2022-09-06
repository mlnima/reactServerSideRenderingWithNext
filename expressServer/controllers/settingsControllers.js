"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var settingSchema_1 = tslib_1.__importDefault(require("../models/settings/settingSchema"));
var settingsControllers = {
    create: function (req, res) {
        var dataToSave = new settingSchema_1.default({
            type: req.body.type,
            data: req.body.data
        });
        dataToSave.save().then(function () {
            res.end();
        }).catch(function (err) {
            console.log(err);
            res.end();
        });
    }
};
exports.default = settingsControllers;
//# sourceMappingURL=settingsControllers.js.map