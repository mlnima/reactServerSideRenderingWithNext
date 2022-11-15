"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
var mongoIdValidator = function (_id) {
    try {
        return _id ? mongoose_1["default"].isValidObjectId(_id) && (_id === null || _id === void 0 ? void 0 : _id.match(/^[0-9a-fA-F]{24}$/)) : false;
    }
    catch (err) {
        return false;
    }
};
exports["default"] = mongoIdValidator;
