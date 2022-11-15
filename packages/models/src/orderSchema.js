"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
var orderSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        "default": 'guest'
    },
    status: {
        type: String,
        "default": 'pending'
    },
    additionalData: Schema.Types.Mixed,
    payPalData: {
        type: Schema.Types.Mixed,
        required: true
    }
});
exports["default"] = mongoose_1["default"].model("order", orderSchema);
//plan
