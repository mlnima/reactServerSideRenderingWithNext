"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
function sortArrayByPropertyOfObject(array, key, order) {
    if (order === void 0) { order = 'asc'; }
    var instanceArray = tslib_1.__spreadArray([], tslib_1.__read(array), false);
    try {
        return instanceArray.sort(function (a, b) {
            if (a[key] < b[key]) {
                return order === 'asc' ? -1 : 1;
            }
            else if (a[key] > b[key]) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
    catch (error) {
        console.error('Error while sorting array:', error);
        return array;
    }
}
exports["default"] = sortArrayByPropertyOfObject;
