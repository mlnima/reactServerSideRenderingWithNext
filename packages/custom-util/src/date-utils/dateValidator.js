"use strict";
exports.__esModule = true;
var dateValidator = function (date) {
    try {
        var dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        console.log(dateRegex.test(date));
        return dateRegex.test(date);
    }
    catch (error) {
        return false;
    }
};
exports["default"] = dateValidator;
