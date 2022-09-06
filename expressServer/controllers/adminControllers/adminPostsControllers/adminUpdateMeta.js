"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var metaSchema_1 = tslib_1.__importDefault(require("../../../models/metaSchema"));
var adminUpdateMeta = function (req, res) {
    metaSchema_1.default.findByIdAndUpdate(req.body.data._id, tslib_1.__assign({}, req.body.data), { new: true }).exec().then(function (updatedMeta) {
        res.json({ updated: updatedMeta, message: 'updated' });
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({ message: 'Error While Trying To Update Meta', err: err });
    });
};
exports.default = adminUpdateMeta;
//# sourceMappingURL=adminUpdateMeta.js.map