"use strict";
exports.__esModule = true;
var isUserFromExternalLink = function (req, domain) {
    var _a, _b;
    try {
        var referer = ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.referer) &&
            !((_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.referer.includes(domain));
        return referer;
    }
    catch (err) {
        return false;
    }
};
exports["default"] = isUserFromExternalLink;
