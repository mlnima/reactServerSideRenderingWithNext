"use strict";
exports.__esModule = true;
var mongoIdValidator = function (_id) {
    try {
        return _id === null || _id === void 0 ? void 0 : _id.match(/^[0-9a-fA-F]{24}$/);
    }
    catch (err) {
        return false;
    }
};
exports["default"] = mongoIdValidator;
