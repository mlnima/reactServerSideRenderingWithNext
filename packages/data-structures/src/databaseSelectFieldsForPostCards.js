"use strict";
exports.__esModule = true;
var postFieldRequestForCards_1 = require("./postFieldRequestForCards");
var databaseSelectFieldsForPostCards = postFieldRequestForCards_1["default"].reduce(function (selectFields, currentField) {
    var _a;
    Object.assign((_a = {}, _a[currentField] = 1, _a), selectFields);
    return selectFields;
}, {});
exports["default"] = databaseSelectFieldsForPostCards;
