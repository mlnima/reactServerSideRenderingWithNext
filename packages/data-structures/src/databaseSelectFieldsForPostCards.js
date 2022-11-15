"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var postFieldRequestForCards_1 = tslib_1.__importDefault(require("./postFieldRequestForCards"));
var databaseSelectFieldsForPostCards = postFieldRequestForCards_1["default"].reduce(function (selectFields, currentField) {
    var _a;
    Object.assign((_a = {}, _a[currentField] = 1, _a), selectFields);
    return selectFields;
}, {});
exports["default"] = databaseSelectFieldsForPostCards;
