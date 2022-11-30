"use strict";
exports.__esModule = true;
var queryUniquer = function (query) {
    return typeof query === "string" ? query : query[0];
};
exports["default"] = queryUniquer;
