"use strict";
exports.__esModule = true;
//process.env.NEXT_PUBLIC_DEFAULT_LOCAL
var getTextDataWithTranslation = function (locale, name, parentObject, defaultLocale) {
    var _a, _b;
    var isDefaultLocale = locale === defaultLocale;
    return isDefaultLocale ? parentObject === null || parentObject === void 0 ? void 0 : parentObject[name] : ((_b = (_a = parentObject.translations) === null || _a === void 0 ? void 0 : _a[locale]) === null || _b === void 0 ? void 0 : _b[name]) || (parentObject === null || parentObject === void 0 ? void 0 : parentObject[name]) || null;
};
exports["default"] = getTextDataWithTranslation;
