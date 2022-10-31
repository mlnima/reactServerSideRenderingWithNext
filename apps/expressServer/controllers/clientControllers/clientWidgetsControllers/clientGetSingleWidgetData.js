"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var widgetSchema = require('../../../../../packages/models/src/widgetSchema');
var clientGetSingleWidgetData = function (req, res) {
    var id = req.body.id;
    widgetSchema.findById(id).exec().then(function (widgetData) {
        res.json({ widgetData: widgetData, error: false });
    }).catch(function (err) {
        console.log(err);
        res.status(400).send('Bad Request');
    });
};
exports.default = clientGetSingleWidgetData;
//# sourceMappingURL=clientGetSingleWidgetData.js.map