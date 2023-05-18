"use strict";
exports.__esModule = true;
var usernameValidatorRegisterForm = function (username) {
    if (!username)
        return false;
    var regex = /^[a-z0-9]{6,16}$/;
    var isValid = regex.test(username);
    if (username.toLowerCase().includes('admin')) {
        isValid = false;
    }
    return isValid;
};
exports["default"] = usernameValidatorRegisterForm;
