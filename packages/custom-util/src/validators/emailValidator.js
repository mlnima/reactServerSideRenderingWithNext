"use strict";
exports.__esModule = true;
var emailValidator = function (email) {
    if (!email)
        return false;
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};
exports["default"] = emailValidator;
