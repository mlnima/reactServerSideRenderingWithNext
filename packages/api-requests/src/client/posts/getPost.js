"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var custom_util_1 = require("custom-util");
var AxiosInstance_1 = tslib_1.__importDefault(require("../../lib/AxiosInstance"));
var getPost = function (identifier) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var queryGeneratorData, _id, title, queriesDataObject, queries;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryGeneratorData = (0, custom_util_1.mongoIdValidator)(identifier) ? { _id: identifier } : { title: identifier };
                _id = queryGeneratorData._id ? { _id: queryGeneratorData._id } : {};
                title = queryGeneratorData.title ? { title: encodeURIComponent(queryGeneratorData.title) } : {};
                queriesDataObject = tslib_1.__assign(tslib_1.__assign({}, _id), title);
                queries = "?".concat(new URLSearchParams(queriesDataObject).toString());
                return [4 /*yield*/, AxiosInstance_1["default"].get("/api/v1/posts/clientGetPost".concat(queries))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = getPost;
