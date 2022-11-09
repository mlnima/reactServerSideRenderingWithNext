"use strict";
exports.__esModule = true;
var isEmptyObject = function (ObjectToTest) {
    if (!ObjectToTest)
        return false;
    return Object.keys(ObjectToTest).length === 0 && (ObjectToTest === null || ObjectToTest === void 0 ? void 0 : ObjectToTest.constructor) === Object;
};
exports["default"] = isEmptyObject;
