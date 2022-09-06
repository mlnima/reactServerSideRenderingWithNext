"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var uuid_apikey_1 = tslib_1.__importDefault(require("uuid-apikey"));
var adminNewApiKey = function (req, res) {
    var newAPIKey = uuid_apikey_1.default.create();
    var newUserData = tslib_1.__assign(tslib_1.__assign({}, req.userData), { API_KEY: newAPIKey.apiKey, uuid: newAPIKey.uuid });
    userSchema_1.default.findByIdAndUpdate(req.userData._id, newUserData).exec().then(function (savedData) {
        res.json({ updatedData: savedData });
    }).catch(function (err) {
        console.log(err);
        res.end();
    });
};
exports.default = adminNewApiKey;
//# sourceMappingURL=adminNewApiKey.js.map