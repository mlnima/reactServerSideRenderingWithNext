"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var formSchema_1 = tslib_1.__importDefault(require("../../../models/formSchema"));
var clientSaveFormData = function (req, res) {
    var formData = req.body.data;
    var formDataDataToSave = new formSchema_1.default(formData);
    formDataDataToSave.save().then(function (savedData) {
        res.json({ savedData: savedData });
    }).catch(function (err) {
        console.log(err);
        res.end();
    });
};
exports.default = clientSaveFormData;
//# sourceMappingURL=clientSaveFormData.js.map