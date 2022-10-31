"use strict";
exports.__esModule = true;
var isJsonString = function (jsonString) {
    if (typeof jsonString !== "string") {
        return false;
    }
    try {
        JSON.parse(jsonString);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports["default"] = isJsonString;
