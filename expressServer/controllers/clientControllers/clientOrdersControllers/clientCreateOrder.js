"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var orderSchema_1 = tslib_1.__importDefault(require("../../../models/orderSchema"));
var clientCreateOrder = function (req, res) {
    try {
        var orderData = new orderSchema_1.default(req.body.data);
        orderData.save().then(function (createdOrder) {
            res.json({ createdOrder: createdOrder, error: false });
        }).catch(function (err) {
            console.log(err);
            res.json({ error: true, err: err });
        });
    }
    catch (err) {
        console.log(err);
        res.json({ error: true, err: err });
    }
};
exports.default = clientCreateOrder;
//# sourceMappingURL=clientCreateOrder.js.map