"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiError = require('../_variables/ApiError');
var apiErrorHandler = function (err, req, res, next) {
    console.error(err);
    if (err instanceof ApiError) {
        res.status(err.code).json(err.message);
        return;
    }
    res.status(500).json('Something went wrong please try again later');
};
exports.default = apiErrorHandler;
//# sourceMappingURL=apiErrorHandler.js.map