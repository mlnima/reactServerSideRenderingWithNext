"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiError = /** @class */ (function () {
    function ApiError(code, message) {
        //@ts-ignore
        this.code = code;
        //@ts-ignore
        this.message = message;
    }
    ApiError.badRequest = function (msg) {
        return new ApiError(400, msg);
    };
    ApiError.internal = function (msg) {
        return new ApiError(500, msg);
    };
    return ApiError;
}());
exports.default = ApiError;
//# sourceMappingURL=ApiError.js.map