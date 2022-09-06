"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var widgetSchema_1 = tslib_1.__importDefault(require("../../../models/widgetSchema"));
var clientGetWidget = function (req, res) {
    var position = req.body.position = 'all' ? {} : { position: req.body.position };
    widgetSchema_1.default.find(position).exec().then(function (widgets) {
        res.json({ widgets: widgets });
    }).catch(function (err) {
        console.log(err);
        res.status(400).send('Bad Request');
    });
};
exports.default = clientGetWidget;
//# sourceMappingURL=clientGetWidget.js.map