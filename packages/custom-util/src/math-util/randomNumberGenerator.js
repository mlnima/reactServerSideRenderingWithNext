"use strict";
exports.__esModule = true;
var randomNumberGenerator = function (min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
};
exports["default"] = randomNumberGenerator;
