"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var settingSchema_1 = tslib_1.__importDefault(require("../../../models/settings/settingSchema"));
var adminUpdateSettings = function (req, res) {
    var type = req.body.type;
    var data = req.body.data;
    settingSchema_1.default.findOneAndUpdate({ type: type }, { data: data }, { new: true }).exec().then(function (setting) {
        if (!setting) {
            var dataToSave = new settingSchema_1.default({
                type: req.body.type,
                data: req.body.data
            });
            dataToSave.save().then(function () {
                res.status(200);
            }).catch(function (err) {
                console.log(err);
                res.status(500);
            });
        }
        else {
            res.json({ message: 'Updated' });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
};
exports.default = adminUpdateSettings;
//# sourceMappingURL=adminUpdateSettings.js.map