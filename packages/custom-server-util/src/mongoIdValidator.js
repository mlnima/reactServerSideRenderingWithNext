"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var mongoIdValidator = function (_id) {
    try {
        return _id ? mongoose_1["default"].isValidObjectId(_id) && (_id === null || _id === void 0 ? void 0 : _id.match(/^[0-9a-fA-F]{24}$/)) : false;
    }
    catch (err) {
        return false;
    }
};
exports["default"] = mongoIdValidator;
