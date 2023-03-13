"use strict";
exports.__esModule = true;
//process.env.NEXT_PUBLIC_DEFAULT_LOCAL
var getTextDataWithTranslation = function (locale, name, parentObject) {
    var _a, _b;
    //@ts-ignore
    var isDefaultLocale = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL;
    return isDefaultLocale ? parentObject === null || parentObject === void 0 ? void 0 : parentObject[name] : ((_b = (_a = parentObject.translations) === null || _a === void 0 ? void 0 : _a[locale]) === null || _b === void 0 ? void 0 : _b[name]) || (parentObject === null || parentObject === void 0 ? void 0 : parentObject[name]) || null;
};
exports["default"] = getTextDataWithTranslation;
