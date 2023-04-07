"use strict";
exports.__esModule = true;
var getCurrentDatePath = function () {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var paddedMonth = month.toString().padStart(2, '0');
    var paddedDay = day.toString().padStart(2, '0');
    return "".concat(year, "/").concat(paddedMonth, "/").concat(paddedDay);
};
exports["default"] = getCurrentDatePath;
