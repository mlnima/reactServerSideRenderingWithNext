"use strict";
exports.__esModule = true;
var convertVariableNameToName = function (str) {
    try {
        return str.replace(/([A-Z])/g, " $1")
            .charAt(0).toUpperCase() + str
            .replace(/([A-Z])/g, " $1")
            .slice(1);
    }
    catch (err) {
        return str;
    }
};
exports["default"] = convertVariableNameToName;
