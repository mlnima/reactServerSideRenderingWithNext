"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var orderSchema_1 = tslib_1.__importDefault(require("../../../models/orderSchema"));
var adminGetOrders = function (req, res) {
    var _a;
    var size = parseInt(req.body.size) > 500 ? 500 : parseInt(req.body.size);
    var pageNo = req.body.pageNo || 1;
    var orderTypeQuery = req.body.orderType === 'all' ? {} : { type: req.body.orderType };
    var statusQuery = req.body.status === 'all' ? {} : { status: req.body.status };
    var searchQuery = req.body.keyword === '' ? {} : {
        $or: [
            { buyer: new RegExp(req.body.keyword, 'i') },
            { shippingAddress: new RegExp(req.body.keyword, 'i') }
        ]
    };
    var sortQuery = req.body.sort === 'latest' || req.body.sort === 'random' ? { lastModify: -1 } : (_a = {}, _a[req.body.sort] = -1, _a);
    var ordersCount = orderSchema_1.default.countDocuments({ $and: [statusQuery, orderTypeQuery, searchQuery] }).exec();
    //@ts-ignore
    var orders = orderSchema_1.default.find({ $and: [orderTypeQuery, statusQuery, searchQuery] }).skip(size * (pageNo - 1)).limit(size).sort(sortQuery).exec();
    Promise.all([orders, ordersCount]).then(function (data) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            res.json({ orders: data[0], error: false, totalCount: data[1] });
            return [2 /*return*/];
        });
    }); }).catch(function (err) {
        return res.status(500).json({
            message: 'Server Error'
        });
    });
};
exports.default = adminGetOrders;
//# sourceMappingURL=adminGetOrders.js.map