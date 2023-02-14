"use strict";
exports.__esModule = true;
var ObjectToQuery = function (data) {
    return '?' + new URLSearchParams(data).toString();
};
exports["default"] = ObjectToQuery;
