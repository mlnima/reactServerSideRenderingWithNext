"use strict";
exports.__esModule = true;
var isInternalUrl = function (url, domain) {
    return url.includes(domain) || !url.includes('http');
};
exports["default"] = isInternalUrl;
