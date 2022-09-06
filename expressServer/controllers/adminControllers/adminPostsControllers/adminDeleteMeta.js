"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metaSchema = require('../../../models/metaSchema');
var adminDeleteMeta = function (req, res) {
    var _id = req.body._id;
    metaSchema.findByIdAndDelete(_id).exec().then(function () {
        res.json({ message: 'deleted' });
    }).catch(function (err) {
        res.status(500).json({ message: 'Can Not Delete', err: err });
    });
};
exports.default = adminDeleteMeta;
//# sourceMappingURL=adminDeleteMeta.js.map