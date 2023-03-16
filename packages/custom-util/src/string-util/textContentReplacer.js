"use strict";
exports.__esModule = true;
var textContentReplacer = function (textString, replaces) {
    var now = new Date();
    try {
        //@ts-ignore
        return textString.replaceAll('__NAME', (replaces === null || replaces === void 0 ? void 0 : replaces.name) || '')
            .replaceAll('__SITE_NAME', (replaces === null || replaces === void 0 ? void 0 : replaces.siteName) || '')
            .replaceAll('__COUNT', (replaces === null || replaces === void 0 ? void 0 : replaces.count) || '')
            .replaceAll('__YEAR', now.getFullYear());
    }
    catch (err) {
        return textString;
    }
};
exports["default"] = textContentReplacer;
